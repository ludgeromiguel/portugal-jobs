import { FastifyRequest } from 'fastify';

import AppError from '@errors/AppError';
import { TYPE_JOBS_ARRAY } from '@constants/index';
import IAnuncioCreateDTO from './IAnuncioCreateDTO';

class AnuncioCreateVerifications {
  execute(req: FastifyRequest<IAnuncioCreateDTO>) {
    const {
      companyName,
      local,
      salary,
      isNegotiable,
      role,
      typeJob,
      description,
      requirements,
      contractType,
    } = req.body;

    if (!companyName || typeof companyName !== 'string') throw new AppError('Empresa inválida', 400);

    if (!local || typeof local !== 'string') throw new AppError('Localização inválida', 400);

    if (!salary || typeof salary !== 'number' || salary < 700) throw new AppError('Salário inválido', 400);

    if (typeof isNegotiable !== 'boolean') { throw new AppError('Checkbox negociável inválida', 400); }

    if (!role || typeof role !== 'string') throw new AppError('Cargo inválido', 400);

    if (!typeJob || typeof typeJob !== 'string' || !TYPE_JOBS_ARRAY.includes(typeJob.toLowerCase())) throw new AppError('Tipo de trabalho inválido', 400);

    if (!description || typeof description !== 'string' || description.length > 500) throw new AppError('Descrição inválida', 400);

    if (requirements && typeof requirements !== 'string' && (requirements as string).length > 500) throw new AppError('Requesitos inválidos', 400);

    if (!contractType || typeof contractType !== 'string') throw new AppError('Tipo de contrato inválido', 400);
  }
}

export default AnuncioCreateVerifications;
