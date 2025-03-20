import { FastifyInstance} from "fastify";
import AsyncHandler from "../utils/Asynchandler";
import { userLogin, userRegister,userLogout } from "../controllers/user.controller";

const RegisterSchema = {
    body:{
        type:'object',
        required:['name','email','password'],
        properties:{
            name:{type:'string'},
            email:{type:'string'},
            password:{type:'string'}
        }
    }
}
const LoginSchema = {
    body:{
        type:'object',
        required:['email','password'],
        properties:{
            email:{type:'string'},
            password:{type:'string'}
        }
    }
}
const UserFunctions = async(fastify:FastifyInstance,options:any)=>{
    fastify.post('/register',{schema:RegisterSchema},AsyncHandler(userRegister))
    fastify.post('/login',{schema:LoginSchema},AsyncHandler(userLogin))
    fastify.post("/logout",AsyncHandler(userLogout))
}

export default UserFunctions;