import process from "node:process";
import Fastify from "fastify";

export default async function () {
  const fastify = Fastify({ logger: false });

  fastify.get("/", (request, reply) => {
    if (process.pid % 2 === 0) {
      process.exit(1);
    }
    return `Hello from ${process.pid}`;
  });

  await fastify.listen({ port: 3000 });
}
