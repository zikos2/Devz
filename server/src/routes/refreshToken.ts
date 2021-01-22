import { verify } from "jsonwebtoken";
import { Recruiter } from "../entity/Recruiter";
import { createRefreshToken, createAccessToken } from "../helpers/auth";
import { sendRefreshToken } from "../helpers/sendRefreshToken";
import { Request, Response } from "express"

const refreshToken = async (req: Request, res: Response) => {
    const token = req.cookies.jid;
    if (!token) {
        console.log("no token")
        return res.json({ ok: false, token: "" })
    }

    let payload: any = null
    try {
        payload = verify(token, "refreshSecret")

    } catch (err) {
        console.log(err);
        return res.json({ ok: false, token: "" })
    }

    //Valid token

    const recruiter = await Recruiter.findOne({ id: payload.recruiterId })
    if (!recruiter) {
        console.log("user dose not exist");
        return res.json({ ok: false, token: "" })
    }

    if (recruiter.tokenVersion !== payload.tokenVersion) {
        console.log("invalid version")
        return res.json({ ok: false, token: "" })
    }

    sendRefreshToken(res, createRefreshToken(recruiter))

    return res.json({ ok: true, token: createAccessToken(recruiter) })

}
export default refreshToken