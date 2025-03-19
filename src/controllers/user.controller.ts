import { FastifyInstance, FastifyReply } from "fastify";
import User from "../models/user.model";
import bcrypt from "bcrypt";
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
        const hashedPassword = bcrypt.hashSync(password, 10);
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
    reply.status(200).send({
        success:true,
        message:"User logged in successfully"
    })
}
