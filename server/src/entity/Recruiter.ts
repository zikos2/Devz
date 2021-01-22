import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import {Field,  ObjectType} from "type-graphql"


@ObjectType()
@Entity()
export class Recruiter extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  email: string;
  
  @Field()
  @Column()
  password: string;
  
  @Column("int",{default:0})
  tokenVersion: number;
}
