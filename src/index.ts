import fastify from "./app";
const port = 3000
fastify.listen({port}, (err,_) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${port}`);
});