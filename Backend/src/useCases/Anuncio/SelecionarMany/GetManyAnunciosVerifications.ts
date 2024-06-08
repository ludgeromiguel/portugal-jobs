import { FastifyRequest } from 'fastify';

import AppError from '@errors/AppError';
import { TYPE_JOBS_ARRAY } from '@constants/variablesChoices';
import IGetManyAnunciosDTO from './IGetManyAnunciosDTO';

class GetManyAnunciosVerifications {
  execute(req: FastifyRequest<IGetManyAnunciosDTO>) {
    const {
      local,
      salary,
      typeJob,
      role,
      contractType,
      pageSize,
      pageIndex,
    } = req.query;

    if (!pageSize || Number.isNaN(pageSize) || !Number.isInteger(pageSize) || pageSize <= 0 || pageSize > 100) throw new AppError('Tens de passar o número de registos por página, sendo que tem de ser um número inteiro entre 1 e 100.', 400);
    req.query.pageSize = Number(pageSize);

    if (pageIndex && (Number.isNaN(pageIndex) || pageIndex <= 0 || !Number.isInteger(pageIndex))) throw new AppError('O número da página tem de ser um número inteiro maior que 0.', 400);

    if (!pageIndex) req.query.pageIndex = 1;
    else req.query.pageIndex = Number(pageIndex);

    if (local && typeof local !== 'string') throw new AppError('Localização inválida', 400);

    if (salary && (Number.isNaN(salary) || salary < 700)) throw new AppError('Salário inválido. Tem que ser um número e maior ou igual a 700', 400);

    if (role && typeof role !== 'string') throw new AppError('Cargo inválido', 400);

    if (typeJob && (typeof typeJob !== 'string' || !TYPE_JOBS_ARRAY.includes(typeJob.toLowerCase()))) throw new AppError('Tipo de trabalho inválido', 400);

    if (contractType && typeof contractType !== 'string') throw new AppError('Tipo de contrato inválido', 400);
  }
}

export default GetManyAnunciosVerifications;
