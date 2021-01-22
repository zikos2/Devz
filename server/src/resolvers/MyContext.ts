import {Request,Response} from "express"

export interface MyContext{
    req: Request
    res: Response
    token?: string
    payload? : {recruiterId:string}
}