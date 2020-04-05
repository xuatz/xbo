import fastify from 'fastify';
import fastifyBlipp from 'fastify-blipp';
import { IncomingMessage, Server, ServerResponse } from 'http';
import statusRoutes from './modules/routes/status';

const server: fastify.FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify();

server.register(fastifyBlipp);
server.register(statusRoutes);

const start = async () => {
  try {
    // await server.listen(9000, '0.0.0.0');
    await server.listen(3000);
    server.blipp();
  } catch (err) {
    console.log(err);
    server.log.error(err);
    process.exit(1);
  }
};

process.on('uncaughtException', error => {
  console.error(error);
});
process.on('unhandledRejection', error => {
  console.error(error);
});

start();
