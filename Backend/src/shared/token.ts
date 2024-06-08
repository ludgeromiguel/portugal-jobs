import { FastifyInstance } from 'fastify';
import { SignPayloadType } from '@fastify/jwt';

function generateToken(payload: SignPayloadType, server: FastifyInstance) {
  return server.jwt.sign(payload);
}

export { generateToken };
