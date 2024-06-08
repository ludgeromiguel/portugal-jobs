import { FastifyRequest } from 'fastify';

import AppError from '@errors/AppError';
import IUserVerifyAccountDTO from './IUserVerifyAccountDTO';

class UserVerifyAccountVerifications {
  execute(req: FastifyRequest<IUserVerifyAccountDTO>) {
    const { verifyCode } = req.body;

    if (!verifyCode || typeof verifyCode !== 'string') throw new AppError('Código de verificação inválido', 400);
    req.body.verifyCode = verifyCode.toUpperCase();
  }
}

export default UserVerifyAccountVerifications;
