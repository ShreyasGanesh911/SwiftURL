import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import AsyncHandler from '../utils/Asynhandler';
import RateLimiter from '../middleware/rateLimiter';

const APIFunction = async (fastify: FastifyInstance,options:any) => {
    fastify.get('/',{preHandler:RateLimiter(10,100)} ,AsyncHandler(async (request:FastifyRequest, reply:FastifyReply) => {
        reply.send({success:true,message:"Some data"});
    })
    );
}

export default APIFunction;