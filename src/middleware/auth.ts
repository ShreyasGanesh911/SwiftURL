import { FastifyReply, FastifyRequest } from "fastify"
import jwt, { JsonWebTokenError } from "jsonwebtoken"
import User from "../models/user.model"
const JWT_KEY = process.env.JWT_KEY || "qwerty"
type UserType = {
    _id: string,
    name: string,
    email: string,

}
const AuthMiddleware = async(req:FastifyRequest,reply:FastifyReply)=>{
    const {auth} = req.cookies
   
    if(!auth){
        return reply.code(401).send({success:false,message:"Unauthorized, no cookie found"})
    }
    await jwt.verify(auth,JWT_KEY,async(err:JsonWebTokenError |null,decoded:any)=>{
        if(err){
           
            return reply.clearCookie('auth').status(401).send({success:false,message:"Unauthorized some error"})
        }
        const value  = decoded as UserType
        const exist = await User.findById({_id:value._id}).select("-password -created_at -createdAt -updatedAt -__v") as UserType
        if(!exist){
            return reply.clearCookie('auth').status(401).send({success:false,message:"Unauthorized"})
        }
        req.user = exist

    })

}

export default AuthMiddleware