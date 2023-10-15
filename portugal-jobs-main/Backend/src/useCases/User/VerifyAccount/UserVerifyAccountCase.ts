import { FastifyRequest } from 'fastify';

import IUsersRepository from '@repositories/IUsersRepository';
import IUserVerificationCodeRepository from '@repositories/IUserVerificationCodeRepository';
import AppError from '@errors/AppError';
import IUserVerifyAccountDTO from './IUserVerifyAccountDTO';

class UserVerifyAccountCase {
  constructor(
    private usersRepository: IUsersRepository,
    private userVerificationCodeRepository: IUserVerificationCodeRepository,
  ) {}

  async execute(req: FastifyRequest<IUserVerifyAccountDTO>): Promise<void> {
    const { userID } = req;
    const { verifyCode } = req.body;

    let userDB = await this.usersRepository.findById(userID);
    if (!userDB) throw new AppError('O utilizador não existe', 401);

    if (userDB.isVerified) throw new AppError('A tua conta já está verificada', 400);

    const userVerifyCode = await this.userVerificationCodeRepository.getVerificationCode(userID);
    if (!userVerifyCode) throw new AppError('Não existe um código de verificação para a tua conta', 400);

    if (userVerifyCode.verificationCode !== verifyCode) throw new AppError('O código de verificação está errado', 400);
    if (new Date(userVerifyCode.endDateTime) < new Date()) throw new AppError('O código de verificação expirou', 400);

    userDB.isVerified = true;
    userDB = await this.usersRepository.update(userDB);
    if (!userDB || !userDB.isVerified) throw new AppError('Erro ao verificar a tua conta', 500);

    await this.userVerificationCodeRepository.delVerificationCode(userID);
  }
}

export default UserVerifyAccountCase;
