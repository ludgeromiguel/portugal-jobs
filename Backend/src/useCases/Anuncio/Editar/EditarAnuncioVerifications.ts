import { FastifyRequest } from 'fastify';

import { TYPE_JOBS_ARRAY } from '@constants/variablesChoices';
import AppError from '@errors/AppError';
import { verifyUUID } from '@shared/index';
import IEditarAnuncioDTO from './IEditarAnuncioDTO';

class EditarAnuncioVerifications {
  execute(req: FastifyRequest<IEditarAnuncioDTO>) {
    const {
      local,
      salary,
      isNegotiable,
      role,
      typeJob,
      description,
      requirements,
      contractType,
    } = req.body;
    const {
      anuncioID,
    } = req.params;

    if (typeof local === 'undefined'
      && typeof salary === 'undefined'
      && typeof isNegotiable === 'undefined'
      && typeof role === 'undefined'
      && typeof typeJob === 'undefined'
      && typeof description === 'undefined'
      && typeof requirements === 'undefined'
      && typeof contractType === 'undefined') throw new AppError('Tens de passar pelo menos um parâmetro para editar.', 400);

    if (typeof anuncioID !== 'string' || verifyUUID(anuncioID)) throw new AppError('ID de anúncio inválido', 400);

    if (local && typeof local !== 'string') throw new AppError('Localização inválida', 400);

    if (salary && (typeof salary !== 'number' || salary < 700)) throw new AppError('Salário inválido', 400);

    if (typeof isNegotiable !== 'boolean' && isNegotiable) throw new AppError('Checkbox negociável inválida', 400);

    if (role && typeof role !== 'string') throw new AppError('Cargo inválido', 400);

    if (typeJob && (typeof typeJob !== 'string' || !TYPE_JOBS_ARRAY.includes(typeJob.toLowerCase()))) throw new AppError('Tipo de trabalho inválido', 400);

    if (description && (typeof description !== 'string' || description.length > 500)) throw new AppError('Descrição inválida', 400);

    if (requirements && (typeof requirements !== 'string' || requirements.length > 500)) throw new AppError('Requesitos inválidos', 400);

    if (contractType && typeof contractType !== 'string') throw new AppError('Tipo de contrato inválido', 400);
  }
}

export default EditarAnuncioVerifications;
