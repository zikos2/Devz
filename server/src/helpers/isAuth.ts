import { MyContext } from "../resolvers/MyContext";
import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";

export const isAuth : MiddlewareFn<MyContext> = ({context},next)=>{
    const authorization = context.req.headers["authorization"]
    console.log(context.req.headers)
    if(!authorization){
        throw new Error("not authenticated:add req headers")
        
    }

    try{
        const token = authorization.split(" ")[1]
        console.log(token)
        const payload = verify(token,"jwtSecret")
        context.token = token
        context.payload = payload as any
        
    }catch(err){
        console.log(err)
        throw new Error("not athenticated")
    }
   return  next()
}