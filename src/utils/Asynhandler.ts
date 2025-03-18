import { FastifyReply, FastifyRequest } from "fastify";

const AsyncHandler = (fn:Function) =>(request:FastifyRequest,reply:FastifyReply)=>{
    Promise.resolve(fn(request,reply)).catch((err)=>{
        reply.send(err);
    })
}

export default AsyncHandler;