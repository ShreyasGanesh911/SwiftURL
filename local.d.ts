import {FastifyRequest} from 'fastify'
type UserType = {
    _id: string,
    name: string,
    email: string,

}
// declare module 'fastify'{
//     interface FastifyRequest {
//         user?: UserType;
//     }
// }
declare module 'fastify' {
    interface FastifyRequest {
      user?: UserType;  // Optional user property, adjust based on your needs
    }
  }