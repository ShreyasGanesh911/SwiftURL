import Fastify from "fastify";

import APIFunction from "./routes/api.route";
import RateLimiter from "./middleware/rateLimiter";
const fastify = Fastify();
fastify.register(APIFunction,{
    prefix:'/api/v1/data',
    
});

export default fastify;