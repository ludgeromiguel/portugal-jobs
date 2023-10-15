import { FastifyRequest } from 'fastify';

import AppError from '@errors/AppError';
import { USERNAME_REGEX } from '@constants/index';
import IUserGetPDFDTO from './IUserGetCurriculumDTO';

class UserGetPDFVerifications {
  execute(req: FastifyRequest<IUserGetPDFDTO>) {
    const { username } = req.params;

    if (!username || typeof username !== 'string' || !USERNAME_REGEX.test(username)) throw new AppError('Nome de utilizador inválido. Tem que ter no mínimo 3 e no maximo 30 caracteres, e deve começar por uma letra.', 400);
    req.params.username = username.toLowerCase();
  }
}

export default UserGetPDFVerifications;
