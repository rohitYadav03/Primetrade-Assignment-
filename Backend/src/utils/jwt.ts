import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/server.config.js"

export function generateToken(payload : { id : string , role : string}){

    return jwt.sign(payload,JWT_SECRET, { expiresIn : "7d"})

};
