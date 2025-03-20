import { FastifyInstance} from 'fastify';
import AsyncHandler from '../utils/Asynchandler';
import RateLimiter from '../middleware/rateLimiter';
import { handleURL } from '../controllers/api.controller';

const APIFunction = async (fastify: FastifyInstance,options:any) => {
    fastify.get('/:url',{preHandler:RateLimiter(10,100)} ,AsyncHandler(handleURL));
}

export default APIFunction;