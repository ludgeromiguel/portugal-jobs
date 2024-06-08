import Fastify, { FastifyInstance } from 'fastify';
import fastifyRateLimit from '@fastify/rate-limit';
import fastifyRedis from '@fastify/redis';
import fastifyCors from '@fastify/cors';
import fastifyEnv from '@fastify/env';
import fastifyMultipart from '@fastify/multipart';
import fastifyBcrypt from 'fastify-bcrypt';
import fastifyJwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';

import prismaPlugin from '@customPlugins/prismaPlugin';
import errorHandler from '@handlers/errorHandler';
import {
  optionsCors, optionsEnv, optionsRedis, rateLimitConfig, optionsJWT,
  optionsBcrypt, multiPartOptions, swaggerOptions, swaggerUIOptions,
} from '@config/fastifyConfig';
import notFoundHandler from '@handlers/notFoundHandler';
import googleCloudStorage from '@customPlugins/googleCloudStorage';
import Routes from './Routes';

const fastify = Fastify({
  logger: { transport: { target: 'pino-pretty', options: { translateTime: 'dd/mm/yyyy HH:MM:ss Z' } } },
  ignoreTrailingSlash: true,
  trustProxy: true,
  bodyLimit: 1024 * 1024 * 1, // 1MB limit for body
});

async function registerFastify(): Promise<FastifyInstance> {
  await fastify.register(fastifyEnv, optionsEnv);
  fastify.log.info('Env loaded');

  fastify.setErrorHandler((error, req, res) => errorHandler(error, req, res));

  await fastify.register(fastifyRedis, optionsRedis(fastify));
  fastify.log.info('Redis registered');

  await fastify.register(fastifyRateLimit, rateLimitConfig(fastify));
  fastify.log.info('RateLimit registered');

  fastify.setNotFoundHandler({
    preHandler: [fastify.rateLimit()],
  }, (req, res) => notFoundHandler(req, res));

  await fastify.register(prismaPlugin);
  fastify.log.info('Prisma registered');

  await fastify.register(googleCloudStorage);
  fastify.log.info('Google Cloud Storage registered');

  await fastify.register(fastifyMultipart, multiPartOptions);
  fastify.log.info('Multipart registered');

  await fastify.register(fastifyBcrypt, optionsBcrypt);
  fastify.log.info('Bcrypt registered');

  await fastify.register(fastifyJwt, optionsJWT(fastify));
  fastify.log.info('JWT registered');

  await fastify.register(fastifyCors, optionsCors);
  fastify.log.info('CORS registered');

  await fastify.register(fastifySwagger, swaggerOptions);
  fastify.log.info('Swagger registered');

  await fastify.register(new Routes().handle, { prefix: '/api' } as FastifyRoutesOptions);
  fastify.log.info('Fastify Routes registered');

  await fastify.register(fastifySwaggerUI, swaggerUIOptions);
  fastify.log.info('Swagger UI registered');

  return fastify;
}

export default registerFastify;
