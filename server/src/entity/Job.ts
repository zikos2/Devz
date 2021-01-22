import { Field, Int ,ObjectType} from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@ObjectType()
@Entity()
export class Job extends BaseEntity{
    @Field(()=>Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    title: string


    @Field()
    @Column()
    companyName: string
    
    @Field()
    @Column()
    technologies: string
    
    @Field()
    @Column()
    description: string
    
    
    @Field(()=>Int)
    @Column()
    minSal: number

    @Field(()=>Int)
    @Column()
    maxSal: number
    
    @Field()
    @Column()
    degree: string 
    
    @Field()
    @Column()
    type: string
    
    @Field()
    @Column()
    location: string 
    
    @Field()
    @Column()
    role: string
   
    @Field()
    @Column()
    experience: string
    
    @Field()
    @Column()
    industry: string
    
    @Field()
    @Column()
    companySize: string

    @Field()
    @Column()
    imgUrl: string
    
    @Field(()=>Int)
    @Column()
    noVisits: number
    
    @Field(()=>Int)
    @Column()
    noApplications: number 

}