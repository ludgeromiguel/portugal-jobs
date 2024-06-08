import { FastifyReply, FastifyRequest } from 'fastify';

import IUserVerifyAccountDTO from './IUserVerifyAccountDTO';
import UserVerifyAccountCase from './UserVerifyAccountCase';
import UserVerifyAccountVerifications from './UserVerifyAccountVerifications';

class UserVerifyAccountController {
  constructor(
    private userVerifyAccountCase: UserVerifyAccountCase,
    private userVerifyAccountVerifications: UserVerifyAccountVerifications,
  ) {}

  async handle(req: FastifyRequest<IUserVerifyAccountDTO>, res: FastifyReply) {
    this.userVerifyAccountVerifications.execute(req);

    await this.userVerifyAccountCase.execute(req);

    return res.status(200).send({ message: 'Conta verificada com sucesso' });
  }
}

export default UserVerifyAccountController;
