import {Recruiter} from "../entity/Recruiter"
import {sign} from "jsonwebtoken"


export const createAccessToken = (recruiter:Recruiter)=>{
    return sign({recruiterId:recruiter.id},"jwtSecret",{expiresIn:"60m"})
}

export const createRefreshToken = (recruiter:Recruiter)=>{
    return sign({recruiterId:recruiter.id,tokenVersion:recruiter.tokenVersion},"refreshSecret",{expiresIn:"7d"})
}