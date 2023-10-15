import { FastifyReply, FastifyRequest } from 'fastify';

import UserGetVerifyAccountcodeCase from './UserGetVerifyAccountCodeCase';

class UserGetVerifyAccountCodeController {
  constructor(
    private userGetVerifyAccountCodeCase: UserGetVerifyAccountcodeCase,
  ) {}

  async handle(req: FastifyRequest, res: FastifyReply) {
    await this.userGetVerifyAccountCodeCase.execute(req);

    return res.status(200).send({ message: 'Código enviado com sucesso para o email' });
  }
}

export default UserGetVerifyAccountCodeController;
