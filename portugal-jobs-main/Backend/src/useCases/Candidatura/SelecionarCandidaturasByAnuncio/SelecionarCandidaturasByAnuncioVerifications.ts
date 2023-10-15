import { FastifyRequest } from 'fastify';

import AppError from '@errors/AppError';
import { verifyUUID } from '@shared/verifications';
import ISelecionarCandidaturasByAnuncioDTO from './ISelecionarCandidaturasByAnuncioDTO';

class SelecionarCandidaturasByAnuncioVerifications {
  execute(req: FastifyRequest<ISelecionarCandidaturasByAnuncioDTO>) {
    const {
      anuncioID,
    } = req.params;

    const {
      pageIndex,
      pageSize,
    } = req.query;

    if (!pageSize || Number.isNaN(pageSize) || !Number.isInteger(pageSize) || pageSize <= 0 || pageSize > 100) throw new AppError('Tens de passar o número de registos por página, sendo que tem de ser um número inteiro entre 1 e 100.', 400);
    req.query.pageSize = Number(pageSize);

    if (pageIndex && (Number.isNaN(pageIndex) || pageIndex <= 0 || !Number.isInteger(pageIndex))) throw new AppError('O número da página tem de ser um número inteiro maior que 0.', 400);

    if (!pageIndex) req.query.pageIndex = 1;
    else req.query.pageIndex = Number(pageIndex);

    if (typeof anuncioID !== 'string' || verifyUUID(anuncioID)) throw new AppError('ID de anúncio inválido', 400);
  }
}

export default SelecionarCandidaturasByAnuncioVerifications;
