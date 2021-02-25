import { Job } from "../entity/Job";
import { Arg, Mutation, Query, Resolver, Int } from "type-graphql";
import { JobInput } from "../InputTypes/JobInput";
import { getRepository } from "typeorm";
import buildSearchQuery from "../helpers/buildSearchQuery";
import { SearchInput } from "../InputTypes/SearchInput";


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
    async Delete(
        @Arg("id", () => Int) id: number
    ) {
        return await Job.delete(id)
    }


    @Query(() => [Job])
    async search(
        @Arg("filters", () => SearchInput) filters: SearchInput,
        @Arg("limit", () => Int) limit: number,
        @Arg("offset", () => Int) offset: number,
    ) {
        let jobQB = getRepository(Job).createQueryBuilder("job")
        buildSearchQuery(jobQB, filters)
        const jobs = await jobQB.skip(offset).take(limit).getMany()
        return jobs

    }
}