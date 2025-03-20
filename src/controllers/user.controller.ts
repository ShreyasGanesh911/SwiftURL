import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"
const JWT_KEY = process.env.JWT_KEY || "qwerty"
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10
interface UserInstance extends FastifyInstance{
    body:{
        name:string,
        email:string,
        password:string
    }
}
export const userRegister = async(req:UserInstance,reply:FastifyReply)=>{
        const {name,email,password} = req.body;
        const exist = await User.findOne({email});
        if(exist)
            return reply.status(409).send({success:false,message:"User already exists"})
        const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
        const data = await User.create({name,email,password:hashedPassword});
        const {password:_,...user} = data.toObject();
        reply.status(201).send({
            success:true,
            message:"User created successfully",
            user
        })
}

export const userLogin = async(req:UserInstance,reply:FastifyReply)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user)
        return reply.status(404).send({
            success:false,
            message:"User not found"
        })
    const checkPassword = bcrypt.compareSync(password,user.password);
    if(!checkPassword)
        return reply.status(401).send({success:false,message:"Incorrect Password"})
    const {password:_,...data} = user.toObject()
    const cookieAuth = await jwt.sign(data,JWT_KEY,{expiresIn:"1d"})
    reply.setCookie('auth',cookieAuth,{path:"/",httpOnly:true,secure:true,maxAge:1* 24 * 60 * 60 * 1000}).status(200).send({
        success:true,
        message:"User logged in successfully"
    })
}

export const userLogout = async(req:FastifyRequest,reply:FastifyReply)=>{
    reply.clearCookie('auth',{path:"/"}).status(200).send({success:true,message:"User logged out"})
}