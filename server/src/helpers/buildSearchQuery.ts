import { Job } from "src/entity/Job"
import { SearchInput } from "src/InputTypes/SearchInput"
import { SelectQueryBuilder } from "typeorm"

const buildSearchQuery = (jobQB: SelectQueryBuilder<Job>, filters: SearchInput) => {
    console.log("2 called");
    console.log(jobQB);
    console.log(filters);
    if (filters.title) {
        console.log("title called")
        jobQB = jobQB.andWhere("job.title like :title", { title: `%${filters.title}%` })
    }
    if (filters.degree!.length > 0) {
        console.log(filters.degree)
        jobQB = jobQB.andWhere("job.degree IN (:...degree)", { degree: filters.degree })
    }
    if (filters.role!.length > 0) {
        jobQB = jobQB.andWhere("job.role IN (:...role)", { role: filters.role })
    }
    if (filters.experience!.length > 0) {
        jobQB = jobQB.andWhere("job.experience IN (:...experience)", { experience: filters.experience })
    }
    if (filters.type!.length > 0) {
        jobQB = jobQB.andWhere("job.type IN (:...type)", { type: filters.type })
    }
    if (filters.minSal!) {
        jobQB = jobQB.andWhere("job.minSal > (:...minSal)", { minSal: filters.minSal })
    }
    if (filters.maxSal!) {
        jobQB = jobQB.andWhere("job.maxSal < (:...maxSal)", { maxSal: filters.maxSal })
    }
    if (filters.location) {
        jobQB = jobQB.andWhere("job.location = :location", { location: filters.location })
    }
    if (filters.industry) {
        jobQB = jobQB.andWhere("job.industry = :industry", { industry: filters.industry })
    }
}

export default buildSearchQuery