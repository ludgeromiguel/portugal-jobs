import { FastifyRequest } from 'fastify';

import { verifyUUID } from '@shared/verifications';
import AppError from '@errors/AppError';
import IAnuncioCandidatarDTO from './IAnuncioCandidatarDTO';

class AnuncioApapagarVerifications {
  execute(req: FastifyRequest<IAnuncioCandidatarDTO>) {
    const {
      anuncioID,
    } = req.params;

    if (typeof anuncioID !== 'string' || verifyUUID(anuncioID)) throw new AppError('ID de anúncio inválido', 400);
  }
}

export default AnuncioApapagarVerifications;
