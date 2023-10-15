import { FastifyRequest } from 'fastify';

import AppError from '@errors/AppError';
import { EMAIL_REGEX, USERNAME_REGEX } from '@constants/index';
import { capitalizeCase } from '@shared/index';
import IUserCreateAccountDTO from './IUserCreateAccountDTO';

class UserCreateAccountVerifications {
  execute(req: FastifyRequest<IUserCreateAccountDTO>) {
    const {
      email, username, firstName, lastName, number, password,
    } = req.body;

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) throw new AppError('Email inválido', 400);
    req.body.email = email.toLowerCase();

    if (!username || typeof username !== 'string' || !USERNAME_REGEX.test(username)) throw new AppError('Nome de utilizador inválido. Tem que ter no mínimo 3 e no maximo 30 caracteres, e deve começar por uma letra.', 400);

    if (!firstName || typeof firstName !== 'string') throw new AppError('Nome inválido', 400);
    req.body.firstName = capitalizeCase(firstName);

    if (!lastName || typeof lastName !== 'string') throw new AppError('Sobrenome inválido', 400);
    req.body.lastName = capitalizeCase(lastName);

    if (!number || typeof number !== 'number' || number.toString().length !== 9) { throw new AppError('Número de telefone inválido', 400); }

    if (!password || typeof password !== 'string' || password.length < 8) throw new AppError('Senha inválida. Tem que ter no mínimo 8 caracteres.', 400);
  }
}

export default UserCreateAccountVerifications;
