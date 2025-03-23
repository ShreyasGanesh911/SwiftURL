import {FastifyRequest} from 'fastify'
type UserType = {
    _id: string,
    name: string,
    email: string,

}
declare module 'fastify' {
    interface FastifyRequest {
      user?: UserType; 
    }
  }