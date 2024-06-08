import { FastifyInstance, FastifyRequest } from 'fastify';
import { FastifyCorsOptions } from '@fastify/cors';
import { FastifyEnvOptions } from '@fastify/env';
import { FastifyRedisPluginOptions } from '@fastify/redis';
import { errorResponseBuilderContext, FastifyRateLimitOptions, RateLimitPluginOptions } from '@fastify/rate-limit';
import { FastifySwaggerUiOptions } from '@fastify/swagger-ui';
import { SwaggerOptions } from '@fastify/swagger';
import { FastifyJWTOptions } from '@fastify/jwt';
import { FastifyMultipartBaseOptions } from '@fastify/multipart';

import { convertMillisecondsToSeconds, convertMinutesToMilliseconds } from '@shared/index';
import { DOCS_PATH } from '@constants/index';

const optionsCors: FastifyCorsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-forwarded-for'],
  credentials: true,
  maxAge: 86400,
};

const envSchema: FastifyEnvSchema = {
  type: 'object',
  required: ['DATABASE_URL', 'REDIS_IP', 'REDIS_PASSWORD', 'JWT_SECRET', 'MAIL_HOST', 'MAIL_PORT', 'MAIL_USER', 'MAIL_PASS'],
  properties: {
    DATABASE_URL: { type: 'string' },
    PORT: { type: 'number', default: 3333 },
    HOST: { type: 'string', default: '0.0.0.0' },
    REDIS_IP: { type: 'string' },
    REDIS_PORT: { type: 'number', default: 6379 },
    REDIS_PASSWORD: { type: 'string' },
    JWT_SECRET: { type: 'string' },
    MAIL_HOST: { type: 'string' },
    MAIL_NOREPLY: { type: 'string', default: 'noreply@portugaljobs.diogomarques.dev' },
    MAIL_PORT: { type: 'number', default: 465 },
    MAIL_USER: { type: 'string' },
    MAIL_PASS: { type: 'string' },
  },
  additionalProperties: false,
};

const optionsEnv: FastifyEnvOptions = {
  confKey: 'env',
  schema: envSchema,
  dotenv: true,
};

const optionsRedis = (server: FastifyInstance): FastifyRedisPluginOptions => {
  const options: FastifyRedisPluginOptions = {
    host: server.env.REDIS_IP,
    port: server.env.REDIS_PORT,
    password: server.env.REDIS_PASSWORD,
    keyPrefix: 'portugalJobsAPI:',
  };

  return options;
};

const rateLimitConfig = (server: FastifyInstance): RateLimitPluginOptions => {
  const options: FastifyRateLimitOptions = {
    max: 60,
    ban: 10,
    timeWindow: '1 minute',
    cache: convertMinutesToMilliseconds(1),
    allowList: ['127.0.0.1', 'localhost', '127.0.0.1:3333'],
    redis: server.redis,
    nameSpace: 'rateLimit:',
    continueExceeding: false,
    skipOnError: true,
    enableDraftSpec: true,
    errorResponseBuilder(request: FastifyRequest, context: errorResponseBuilderContext) {
      return {
        code: 429,
        error: 'Too Many Requests',
        message: `I only allow ${context.max} requests per ${context.after} to this Website. Try again soon.`,
        date: new Date(),
        expiresIn: `${convertMillisecondsToSeconds(context.ttl).toFixed()} seconds`,
      };
    },
    keyGenerator: (request: FastifyRequest) => {
      let ip = (request.headers['cf-connecting-ip'] || request.ip) as string;

      if (ip.includes(':')) {
        const ipParts = ip.split(':');
        ip = ipParts.join('-');
      }

      return ip;
    },
    addHeadersOnExceeding: {
      'x-ratelimit-limit': true,
      'x-ratelimit-remaining': true,
      'x-ratelimit-reset': true,
    },
    addHeaders: {
      'x-ratelimit-limit': true,
      'x-ratelimit-remaining': true,
      'x-ratelimit-reset': true,
      'retry-after': true,
    },
  };

  return options;
};

const optionsJWT = (server: FastifyInstance): FastifyJWTOptions => {
  const options: FastifyJWTOptions = {
    secret: server.env.JWT_SECRET,
  };

  return options;
};

const optionsBcrypt: BcryptPluginOptions = {
  saltWorkFactor: 12,
};

const multiPartOptions: FastifyMultipartBaseOptions = {
  limits: {
    files: 1,
    fileSize: 1024 * 1024 * 2,
  },
};

const swaggerOptions: SwaggerOptions = {
  mode: 'dynamic',
  swagger: {
    info: {
      title: 'Portugal Jobs API',
      description: 'Rotas da api do Portugal Jobs',
      version: '1.0.0',
    },
    externalDocs: {
      url: 'https://dev.azure.com/a23000/Portugal%20jobs/_wiki/wikis/Portugal-jobs.wiki/10/Documenta%C3%A7%C3%A3o',
      description: 'Docs azure devops',
    },
    consumes: ['application/json'],
    produces: ['application/json'],
    host: process.env.NODE_ENV === 'production' ? 'portugaljobs.diogomarques.dev' : 'localhost:3333',
    schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http'],
    tags: [
      { name: 'Utilizadores', description: 'Rotas para os utilizadores' },
      { name: 'Anúncios', description: 'Rotas para os anúncios' },
      { name: 'Candidaturas', description: 'Rotas para as candidaturas' },
    ],
    securityDefinitions: {
      authorization: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'Token de autorização a api, exemplo: "Bearer TOKEN"',
      },
    },
    security: [{ authorization: [] }],
  },
};

const swaggerUIOptions: FastifySwaggerUiOptions = {
  routePrefix: DOCS_PATH,
  uiConfig: {
    deepLinking: true,
    persistAuthorization: true,
  },
  uiHooks: {
    onRequest(request, reply, next) { next(); },
    preHandler(request, reply, next) { next(); },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject) => swaggerObject,
  transformSpecificationClone: true,
};

export {
  optionsCors, optionsEnv, optionsRedis, rateLimitConfig, optionsJWT,
  optionsBcrypt, multiPartOptions, swaggerOptions, swaggerUIOptions,
};
