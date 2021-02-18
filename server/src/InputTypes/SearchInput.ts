import { Field, InputType, Int } from "type-graphql";


@InputType()
export class SearchInput {
    @Field()
    title?: string

    @Field()
    technologies?: string

    @Field(() => Int)
    minSal?: number

    @Field(() => Int)
    maxSal?: number

    @Field(() => [String])
    degree?: [string]

    @Field(() => [String])
    type?: [string]

    @Field()
    location?: string

    @Field(() => [String])
    role?: [string]

    @Field(() => [String])
    experience?: [string]

    @Field()
    industry?: string

    @Field()
    companySize?: string

}