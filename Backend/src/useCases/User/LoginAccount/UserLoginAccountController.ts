import { FastifyReply, FastifyRequest } from 'fastify';

import AppError from '@errors/AppError';
import IUserLoginAccountDTO from './IUserLoginAccountDTO';
import UserLoginAccountCase from './UserLoginAccountCase';
import UserLoginAccountVerifications from './UserLoginAccountVerifications';

class UserLoginAccountController {
  constructor(
    private userLoginAccountVerifications: UserLoginAccountVerifications,
    private userLoginAccountCase: UserLoginAccountCase,
  ) {}

  async handle(req: FastifyRequest<IUserLoginAccountDTO>, res: FastifyReply) {
    this.userLoginAccountVerifications.execute(req);

    const token = await this.userLoginAccountCase.execute(req);

    if (!token) throw new AppError('Erro ao fazer Login', 500);

    return res.status(200).send({ token, message: 'Login feito com sucesso' });
  }
}

export default UserLoginAccountController;
