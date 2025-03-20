import { FastifyReply, FastifyRequest } from "fastify";

const AsyncHandler = (fn:Function) =>(request:FastifyRequest,reply:FastifyReply)=>{
    Promise.resolve(fn(request,reply)).catch((err)=>{
        console.log("-------Error Occured-------");
        console.log(err)
        reply.send({success:false,message:err });
    })
}

export default AsyncHandler;