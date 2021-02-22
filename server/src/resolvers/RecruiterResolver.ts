import { getConnection } from "typeorm"
import { Query, Resolver, Mutation, Arg, Ctx, ObjectType, Field, UseMiddleware, Int } from "type-graphql"
import { verify } from "jsonwebtoken"
import { hash, compare } from "bcryptjs"
import { v4 } from "uuid"

import { Recruiter } from "../entity/Recruiter"
import { MyContext } from "./MyContext"
import { RecruiterInput } from "../InputTypes/RecruiterInput"
import { createAccessToken, createRefreshToken } from "../helpers/auth"
import { isAuth } from "../helpers/isAuth"
import { sendRefreshToken } from "../helpers/sendRefreshToken"
import { redis } from "../redis"
import { sendEmail } from "../helpers/sendEmail"

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
    @Field(() => Recruiter)
    recruiter: Recruiter;
}


@Resolver()
export class RecruiterResolver {

    @Query(() => [Recruiter])
    getAllRecruiters() {
        return Recruiter.find()
    }


    @Query(() => Recruiter, { nullable: true })
    me(
        @Ctx() context: MyContext
    ) {
        const authorization = context.req.headers["authorization"]
        console.log(context.req.headers)
        if (!authorization) {
            return null
        }

        try {
            const token = authorization.split(" ")[1]
            console.log(token)
            const payload: any = verify(token, "jwtSecret")
            context.token = token
            context.payload = payload as any
            return Recruiter.findOne(payload.recruiterId)

        } catch (err) {
            console.log(err)
            return null
        }
    }

    @Query(() => String)
    @UseMiddleware(isAuth)
    user(
        @Ctx() { payload }: MyContext
    ) {
        console.log(payload);

        return `your user id is: ${payload?.recruiterId}`
    }

    @Mutation(() => Boolean)
    async registreRecruiter(
        @Arg("data", () => RecruiterInput) data: RecruiterInput
    ) {
        const exist = await Recruiter.findOne({ where: { email: data.email } })
        if (exist) {
            throw new Error("User Already Exists");

        }
        const hashed = await hash(data.password, 12)

        try {
            data.password = hashed
            await Recruiter.insert(data)
            return true
        } catch (err) {
            console.log(err)
            throw new Error(err);
        };

    }

    @Query(() => LoginResponse)
    @UseMiddleware(isAuth)
    async verify(
        @Ctx() { payload, token }: MyContext
    ) {

        try {
            return { accessToken: token, recruiter: payload }
        }
        catch (err) {
            console.log(err)
            return { error: "something went wrong" }
        }
    }
    @Query(() => Boolean)
    @UseMiddleware(isAuth)
    async check() {

        return true
    }


    @Mutation(() => LoginResponse)
    async loginRecruiter(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() { res }: MyContext
    ): Promise<LoginResponse> {
        const recruiter = await Recruiter.findOne({ where: { email } })
        if (!recruiter) {
            throw new Error("Recruiter was not found!");

        }

        const valid = await compare(password, recruiter.password);
        if (!valid) {
            throw new Error("Password Incorrect");
        }
        //Login Success
        sendRefreshToken(res, createRefreshToken(recruiter))

        return {
            accessToken: createAccessToken(recruiter),
            recruiter
        }
    }


    @Mutation(() => Boolean)
    logout(
        @Ctx() { res }: MyContext
    ) {
        sendRefreshToken(res, "")
        return true
    }
    @Mutation(() => Boolean)
    async revokeRefreshToken(
        @Arg("recruiterId", () => Int) recruiterId: number
    ) {
        try {
            await getConnection()
                .getRepository(Recruiter)
                .increment({ id: recruiterId }, "tokenVersion", 1)
        } catch (err) {
            console.log(err)
            return false
        }
        return true
    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg("email") email: string
    ): Promise<boolean> {
        const recruiter = await Recruiter.findOne({ where: { email } })

        if (!recruiter) {
            return true
        }

        const token = v4()

        await redis.set(token, recruiter.id, "ex", 60 * 60 * 24);
        const url = `http://localhost:3000/user/change-password/${token}`

        await sendEmail(email, url)

        return true
    }

    @Mutation(() => Recruiter)
    async changePassword(
        @Arg("token") token: string,
        @Arg("newPassword") newPassword: string
    ): Promise<Recruiter | null> {
        const recruiterId = await redis.get(token)
        if (!recruiterId) {
            return null
        }

        const recruiter = await Recruiter.findOne(recruiterId)

        if (!recruiter) {
            return null
        }

        await redis.del(token)

        const hashedPassword = await hash(newPassword, 12)

        recruiter.password = hashedPassword

        await recruiter.save()

        return recruiter
    }


}