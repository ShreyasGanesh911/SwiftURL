import { FastifyInstance } from "fastify";
import AsyncHandler from "../utils/Asynhandler";
import { getUrl, getUrls,createUrl,deleteUrl,updateUrl} from "../controllers/url.controller";
const URLSchema = {
    body:{
        type: 'object',
        required: ['longUrl','shortUrl','category'],
        properties: {
            longUrl: { type: 'string' },
            shortUrl: { type: 'string' },
            category: { type: 'string' },
        }
    }
}
const URLFunction = async(fastify:FastifyInstance,options:any)=>{
    fastify.get("/",AsyncHandler(getUrls))
    fastify.get("/:id",AsyncHandler(getUrl))
    fastify.post("/",{schema:URLSchema},AsyncHandler(createUrl))
    fastify.delete("/:id",AsyncHandler(deleteUrl))
    fastify.put("/:id",AsyncHandler(updateUrl)) // ToDo

}

export default URLFunction;