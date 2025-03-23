import { FastifyInstance } from "fastify";
import AsyncHandler from "../utils/Asynchandler";
import { getUrl, getUrls,createUrl,deleteUrl,updateUrl} from "../controllers/url.controller";
import AuthMiddleware from "../middleware/auth";
import { URLSchema } from "../types/url.types";

const URLFunction = async(fastify:FastifyInstance,options:any)=>{
    fastify.get("/",{preHandler:AuthMiddleware},AsyncHandler(getUrls))
    fastify.get("/:id",{preHandler:AuthMiddleware},AsyncHandler(getUrl))
    fastify.post("/",{schema:URLSchema,preHandler:AuthMiddleware},AsyncHandler(createUrl))
    fastify.delete("/:id",{preHandler:AuthMiddleware},AsyncHandler(deleteUrl))
    fastify.put("/:id",{preHandler:AuthMiddleware},AsyncHandler(updateUrl)) // ToDo

}

export default URLFunction;