import { FastifyReply, FastifyRequest } from "fastify";
import Url from "../models/url.model";
interface URLInsance extends FastifyRequest{
    body:{
        longUrl:string,
        shortUrl:string,
        category:[ "Social", "Business", "News", "Shopping", "Education", 
            "Entertainment", "Personal", "Work", "Tech", "Other"]
    }
}

interface IdInstance extends FastifyRequest{
    query:{
        id:string
    }
}
interface IdInstanceParams extends FastifyRequest{
    params:{
        id:string
    }
}

export const createUrl = async (req:URLInsance,reply:FastifyReply)=>{
    const {longUrl,shortUrl,category} = req.body;
    const userId = "67dab49802d97c0a58df240e"
    const exist = await Url.findOne({shortUrl});
    if(exist)
        return reply.status(409).send({success:false,message:"Short URL already exists"})
    await Url.create({userId,longUrl,shortUrl,category})
    reply.status(201).send({success:true,message:"URL has been created!"})
}

export const getUrls = async (req:IdInstance,reply:FastifyReply)=>{
    const {id} = req.query;
    const urls = await Url.find({userId:id}).select("-userId -__v ");
    reply.status(200).send({success:true,message:"URLs fetched",urls})
}

export const deleteUrl = async (req:IdInstanceParams,reply:FastifyReply)=>{
    const {id} = req.params;
    if (!id)
        return reply.status(400).send({success:false,message:"Invalid URL ID"})
    const url = await Url.findByIdAndDelete({_id:id});
    if(!url)
        return reply.status(404).send({success:false,message:"URL not found"})
    reply.status(200).send({success:true,message:"URL deleted",url})
}

export const updateUrl = async (req:FastifyRequest,reply:FastifyReply)=>{
    reply.send({success:true,message:"URL updated"})
}

export const getUrl = async (req:IdInstanceParams,reply:FastifyReply)=>{
    const {id} = req.params;
    if (!id)
        return reply.status(400).send({success:false,message:"Invalid URL ID"})
    const url = await Url.findOne({_id:id}).select("-userId -__v");
    if(!url)
        return reply.status(404).send({success:false,message:"URL not found"})
    reply.status(200).send({success:true,message:"URL fetched",url})
}




