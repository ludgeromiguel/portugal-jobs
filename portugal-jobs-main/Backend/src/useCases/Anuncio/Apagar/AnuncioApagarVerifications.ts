import { FastifyRequest } from 'fastify';

import { verifyUUID } from '@shared/verifications';
import AppError from '@errors/AppError';
import IAnuncioApagarDTO from './IAnuncioApagarDTO';

class AnuncioApagarVerifications {
  execute(req: FastifyRequest<IAnuncioApagarDTO>) {
    const {
      anuncioID,
    } = req.params;

    if (typeof anuncioID !== 'string' || verifyUUID(anuncioID)) throw new AppError('ID de anúncio inválido', 400);
  }
}

export default AnuncioApagarVerifications;
