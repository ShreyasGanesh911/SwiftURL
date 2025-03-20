import { FastifyReply, FastifyRequest } from "fastify";
import redis from "../db/redis";
import Url from "../models/url.model";
interface URLInstance extends FastifyRequest {
    params:{
        url:string
    }
}
const updateURL = async(url:string,deviceType:string)=>{
    try{
        await Url.updateOne({shortUrl:url},{
            $inc:{clickCount:1,[`deviceTypes.${deviceType}`]: 1},
            $set:{lastClick:new Date()},
        })
    }catch(e){
        console.log(e)
    }
}
const detectDevice = (agent:string)=>{
    if (/iphone|android|mobile/.test(agent)) {
        return "Mobile";
    } else if (/ipad|tablet/.test(agent)) {
        return "Tablet";
    } else {
        return "Desktop";
    }
}
export const handleURL = async(request:URLInstance,reply:FastifyReply)=>{
    const {url} = request.params
    const agent = (request.headers['user-agent'] || "").toLowerCase()
    const deviceType = detectDevice(agent) //find device type
    const cachedLink = await redis.get(url)
    if(cachedLink){
        updateURL(url,deviceType)
        return reply.redirect(cachedLink)
    }
    const mLink = await Url.findOne({shortUrl:url})
    if(!mLink)
        return reply.code(404).send({error:"URL not found"})
    const longLink = mLink.longUrl
    await redis.setex(url,3600,longLink)
    updateURL(url,deviceType)
    reply.redirect(longLink)
}