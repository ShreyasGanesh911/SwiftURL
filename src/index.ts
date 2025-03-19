import fastify from "./app";
import connection from "./db/mongo";
import "dotenv/config";
const port = process.env.PORT ? parseInt(process.env.PORT) : 8000;

connection().then(()=>{
  console.log("Connected to MongoDB")
  fastify.listen({port:port}, (err,_) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(`server listening on ${port}`);
  });
}).catch(e=>{
  console.log("-------------Error connecting to MongoDB--------------")
  console.log(e)
  process.exit(1)
})