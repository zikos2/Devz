import { Job } from "../entity/Job";
import { Arg, Mutation, Query, Resolver, Int } from "type-graphql";
import { JobInput } from "../InputTypes/JobInput";
import { Like } from "typeorm";


@Resolver()
export class JobResolver {

    @Query(() => [Job])
    getAll() {
        return Job.find()
    }

    @Query(() => Job)
    async getJobDetails(
        @Arg("jobId") jobId: number
    ) {
        try {
            return await Job.findOne({ where: { id: jobId } })
        } catch (err) {
            console.log(err);
            return "no job was found"
        }
    }

    @Mutation(() => Job)
    async add(
        @Arg("data", () => JobInput) data: JobInput
    ) {
        const job = await Job.create(data).save()
        return job
    }

    @Mutation(() => Boolean)
    async update(
        @Arg("id", () => Int) id: number,
        @Arg("data", () => JobInput) data: JobInput
    ) {
        await Job.update({ id }, data)

        return true;
    }


    @Query(() => String)
    Delete() {
        return "helloFrom JObs"
    }


    @Query(() => [Job])
    async search(
        @Arg("term") term: string
    ) {
        term = term.toLowerCase()
        const data = await Job.find({ title: Like(`%${term}%`) })
        return data

    }
}