import { FastifyReply, FastifyRequest } from "fastify";
import Url from "../models/url.model";
import { URLInsance,CloudinaryResponse,IdInstanceParams } from "../types/url.types";
import generateQR from "../utils/generateQR";
import uploadToCloudinary from "../utils/cloudinary";

const END_POINT = process.env.END_POINT || "http://localhost:8000" 
export const createUrl = async (req:URLInsance,reply:FastifyReply)=>{
    const {longUrl,shortUrl,category} = req.body;
    const userId = req.user?._id
    const exist = await Url.findOne({shortUrl});
    if(exist)
        return reply.status(409).send({success:false,message:"Short URL already exists"})
    const userURL = `${END_POINT}/${shortUrl}`
    const qrcode = await generateQR(userURL)
   if(qrcode === false){
    console.log("Error in generating QR code")
    return reply.send({success:false,message:"Error in generating QR code"})
   }
   const url:CloudinaryResponse| undefined = await uploadToCloudinary(qrcode as string)
   await Url.create({userId,longUrl,shortUrl,category,qr:url?.url,url:userURL})
    reply.status(201).send({success:true,message:"URL has been created!",link:userURL,qr:url?.url})
}

export const getUrls = async (req:FastifyRequest,reply:FastifyReply)=>{
    const userId = req.user?._id
    const urls = await Url.find({userId}).select("-userId -__v ");
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




