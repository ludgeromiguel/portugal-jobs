import { FastifyReply, FastifyRequest } from 'fastify';

import UserLogoutAccountCase from './UserLogoutAccountCase';

class UserLogoutAccountController {
  constructor(
    private userLogoutAccountCase: UserLogoutAccountCase,
  ) {}

  async handle(req: FastifyRequest, res: FastifyReply) {
    await this.userLogoutAccountCase.execute(req);

    return res.status(200).send({ message: 'Logout feito com sucesso' });
  }
}

export default UserLogoutAccountController;
