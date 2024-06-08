import { FastifyRequest } from 'fastify';

import AppError from '@errors/AppError';
import IUpdateUserInfoDTO from './IUpdateUserInfoDTO';

class UpdateUserInfoVerifications {
  execute(req: FastifyRequest<IUpdateUserInfoDTO>) {
    const {
      password,
      number,
    } = req.body;

    if (!password && !number) throw new AppError('Tens de passar pelo menos um campo para editar', 400);

    if (password && (typeof password !== 'string' || password.length < 8)) throw new AppError('Senha inválida. Tem que ter no mínimo 8 caracteres.', 400);

    if (number && (typeof number !== 'number' || number.toString().length !== 9)) throw new AppError('Número de telefone inválido', 400);
  }
}

export default UpdateUserInfoVerifications;
