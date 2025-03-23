import { FastifyInstance} from "fastify";
import AsyncHandler from "../utils/Asynchandler";
import { userLogin, userRegister,userLogout } from "../controllers/user.controller";
import { RegisterSchema,LoginSchema } from "../types/user.types";

const UserFunctions = async(fastify:FastifyInstance,options:any)=>{
    fastify.post('/register',{schema:RegisterSchema},AsyncHandler(userRegister))
    fastify.post('/login',{schema:LoginSchema},AsyncHandler(userLogin))
    fastify.post("/logout",AsyncHandler(userLogout))
}

export default UserFunctions;