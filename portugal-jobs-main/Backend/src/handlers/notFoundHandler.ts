import { FastifyReply, FastifyRequest } from 'fastify';

import { DOCS_PATH } from '@constants/index';

const notFoundHandler = async (req: FastifyRequest, res: FastifyReply) => {
  await res.status(404).send({
    statusCode: 404, message: 'Invalid Endpoint', path: req.raw.url, method: req.raw.method, docs: DOCS_PATH,
  });
};

export default notFoundHandler;
