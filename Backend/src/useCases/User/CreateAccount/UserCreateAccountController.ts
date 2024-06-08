import { FastifyReply, FastifyRequest } from 'fastify';

import AppError from '@errors/AppError';
import IUserCreateAccountDTO from './IUserCreateAccountDTO';
import UserCreateAccountcase from './UserCreateAccountCase';
import UserCreateAccountVerifications from './UserCreateAccountVerifications';

class UserCreateAccountController {
  constructor(
    private userCreateAccountVerifications: UserCreateAccountVerifications,
    private userCreateAccountCase: UserCreateAccountcase,
  ) {}

  async handle(req: FastifyRequest<IUserCreateAccountDTO>, res: FastifyReply) {
    this.userCreateAccountVerifications.execute(req);

    const token = await this.userCreateAccountCase.execute(req);

    if (!token) throw new AppError('Erro ao criar a conta', 500);

    return res.status(201).send({ token, message: 'Conta criada com sucesso' });
  }
}

export default UserCreateAccountController;
