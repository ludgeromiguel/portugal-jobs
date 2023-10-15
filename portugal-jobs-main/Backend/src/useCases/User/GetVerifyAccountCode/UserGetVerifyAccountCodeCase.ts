import { FastifyInstance, FastifyRequest } from 'fastify';
import { resolve } from 'path';

import AppError from '@errors/AppError';
import IMailProvider from '@providers/IMailProvider';
import IUsersRepository from '@repositories/IUsersRepository';
import IUserVerificationCodeRepository from '@repositories/IUserVerificationCodeRepository';
import { generateCode } from '@shared/index';

class UserGetVerifyAccountcodeCase {
  constructor(
    private server: FastifyInstance,
    private mailProvider: IMailProvider,
    private usersRepository: IUsersRepository,
    private userVerificationCodeRepository: IUserVerificationCodeRepository,
  ) {}

  async execute(req: FastifyRequest): Promise<void> {
    const { userID } = req;

    const userDB = await this.usersRepository.findById(userID);
    if (!userDB) throw new AppError('O utilizador não existe', 401);

    if (userDB.isVerified) throw new AppError('A tua conta já está verificada', 400);

    if (await this.userVerificationCodeRepository.getVerificationCode(userID)) throw new AppError('Já existe um código de verificação a tua conta', 400);

    const userVerifyCode = generateCode(3, 3);

    if (!(await this.userVerificationCodeRepository.setVerificationCode(userID, userVerifyCode))) throw new AppError('Erro ao gerar o código de verificação', 500);

    const htmlPath = resolve(__dirname, '..', '..', '..', 'views', 'emails', 'sendVerifyCodeMail.hbs');

    await this.mailProvider.sendMail(
      userDB.email,
      this.server.env.MAIL_NOREPLY,
      'Código de verificação de conta',
      htmlPath,
      { userVerifyCode },
    );
  }
}

export default UserGetVerifyAccountcodeCase;
