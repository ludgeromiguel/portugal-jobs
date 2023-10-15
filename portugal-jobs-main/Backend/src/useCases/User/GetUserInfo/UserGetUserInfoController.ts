import { FastifyReply, FastifyRequest } from 'fastify';

import UserGetUserInfoCase from './UserGetUserInfoCase';

class UserGetUserInfoController {
  constructor(
    private userGetUserInfoCase: UserGetUserInfoCase,
  ) {}

  async handle(req: FastifyRequest, res: FastifyReply) {
    const user = await this.userGetUserInfoCase.execute(req);

    return res.status(200).send({ user, message: 'Informação do utilizador' });
  }
}

export default UserGetUserInfoController;
