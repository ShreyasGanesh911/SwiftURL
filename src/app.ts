import Fastify from "fastify";
import APIFunction from "./routes/api.route";
import UserFunctions from "./routes/user.route";
import URLFunction from "./routes/url.route";
const fastify = Fastify();
fastify.register(APIFunction,{prefix:'/api/v1/data'});
fastify.register(UserFunctions,{prefix:'/api/v1/user'});
fastify.register(URLFunction,{prefix:'/api/v1/url'});

export default fastify; 