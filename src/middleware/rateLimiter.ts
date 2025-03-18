import { FastifyReply, FastifyRequest } from "fastify";
import redis from "../db/redis";
const RateLimiter = (requestCount: number, timeFrame: number) => async(request:FastifyRequest,reply:FastifyReply)=>{
    const ip = request.headers['x-forwarded-for'] || request.ip;
    const ipkey = "ip:"+ip;
    const count = await redis.incr(ipkey);
        if (count == 1) {
            await redis.expire(ipkey, timeFrame || 100);
        }
        if(count>requestCount){
            const ttl = await redis.ttl(ipkey);
            reply.send({success:false,message:`Rate limit exceeded. Try again in ${ttl} seconds.`});
            return;
        }
}

export default RateLimiter;