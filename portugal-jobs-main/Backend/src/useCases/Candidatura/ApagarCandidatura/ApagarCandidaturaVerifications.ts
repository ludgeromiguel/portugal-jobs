import { FastifyRequest } from 'fastify';

import { verifyUUID } from '@shared/verifications';
import AppError from '@errors/AppError';
import IApagarCandidaturaDTO from './IApagarCandidaturaDTO';

class ApagarCandidaturaVerifications {
  execute(req: FastifyRequest<IApagarCandidaturaDTO>) {
    const {
      candidaturaID,
    } = req.params;

    if (typeof candidaturaID !== 'string' || verifyUUID(candidaturaID)) throw new AppError('ID de candidatura inválido', 400);
  }
}

export default ApagarCandidaturaVerifications;
