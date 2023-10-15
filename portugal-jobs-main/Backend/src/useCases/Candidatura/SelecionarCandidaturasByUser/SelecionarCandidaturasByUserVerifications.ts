import { FastifyRequest } from 'fastify';

import AppError from '@errors/AppError';
import ISelecionarCandidaturasByUserDTO from './ISelecionarCandidaturasByUserDTO';

class SelecionarCandidaturasByUserVerifications {
  execute(req: FastifyRequest<ISelecionarCandidaturasByUserDTO>) {
    const {
      pageSize,
      pageIndex,
    } = req.query;

    if (!pageSize || Number.isNaN(pageSize) || !Number.isInteger(pageSize) || pageSize <= 0 || pageSize > 100) throw new AppError('Tens de passar o número de registos por página, sendo que tem de ser um número inteiro entre 1 e 100.', 400);
    req.query.pageSize = Number(pageSize);

    if (pageIndex && (Number.isNaN(pageIndex) || pageIndex <= 0 || !Number.isInteger(pageIndex))) throw new AppError('O número da página tem de ser um número inteiro maior que 0.', 400);

    if (!pageIndex) req.query.pageIndex = 1;
    else req.query.pageIndex = Number(pageIndex);
  }
}

export default SelecionarCandidaturasByUserVerifications;
