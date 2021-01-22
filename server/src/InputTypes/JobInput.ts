import { Field, InputType,Int } from "type-graphql";

@InputType()
export class JobInput{

    @Field()
    title: string


    @Field()
    companyName: string
    
    @Field()
    technologies: string
    
    @Field()
    description: string
    
    
    @Field(()=>Int)
    minSal: number

    @Field(()=>Int)
    maxSal: number
    
    @Field()
    degree: string 
    
    @Field()
    type: string
    
    @Field()
    location: string 
    
    @Field()
    role: string
   
    @Field()
    experience: string
    
    @Field()
    industry: string
    
    @Field()
    companySize: string

    @Field()
    imgUrl: string
    
    @Field(()=>Int)
    noVisits: number
    
    @Field(()=>Int)
    noApplications: number 


}