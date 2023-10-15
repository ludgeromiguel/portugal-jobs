import { FastifyRequest } from 'fastify';

import { verifyUUID } from '@shared/verifications';
import AppError from '@errors/AppError';
import IGetOneAnuncioDTO from './IGetOneAnuncioDTO';

class GetOneAnuncioVerifications {
  execute(req: FastifyRequest<IGetOneAnuncioDTO>) {
    const {
      anuncioID,
    } = req.params;

    if (typeof anuncioID !== 'string' || verifyUUID(anuncioID)) throw new AppError('ID de anúncio inválido', 400);
  }
}

export default GetOneAnuncioVerifications;
