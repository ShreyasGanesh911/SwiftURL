import Fastify from "fastify";
import APIFunction from "./routes/api.route";
import UserFunctions from "./routes/user.route";
import URLFunction from "./routes/url.route";
import cookie from '@fastify/cookie'

const fastify = Fastify();
fastify.register(cookie)
fastify.register(APIFunction,{prefix:'/'});
fastify.register(UserFunctions,{prefix:'/api/v1/user'});
fastify.register(URLFunction,{prefix:'/api/v1/url'});

export default fastify; 