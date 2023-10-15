import { FastifyRequest, FastifyReply } from 'fastify';

import AppError from '@errors/AppError';

const errorHandler = async (
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ message: error.message });
  }

  request.log.error(error.stack || error);
  return reply.status(500).send({ message: `Internal Server Error ${error.message}` });
};

export default errorHandler;
