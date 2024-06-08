import { FastifyRequest } from 'fastify';

import AppError from '@errors/AppError';
import { USERNAME_REGEX } from '@constants/index';
import IUserLoginAccountDTO from './IUserLoginAccountDTO';

class UserLoginAccountVerifications {
  execute(req: FastifyRequest<IUserLoginAccountDTO>) {
    const { username, password } = req.body;

    if (!username || typeof username !== 'string' || !USERNAME_REGEX.test(username)) throw new AppError('Nome de utilizador inválido. Tem que ter no mínimo 3 e no maximo 30 caracteres, e deve começar por uma letra.', 400);

    if (!password || typeof password !== 'string' || password.length < 8) throw new AppError('Senha inválida. Tem de ter no mínimo 8 caracteres.', 400);
  }
}

export default UserLoginAccountVerifications;
