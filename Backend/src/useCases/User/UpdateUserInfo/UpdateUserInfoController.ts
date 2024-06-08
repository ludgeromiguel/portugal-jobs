import { FastifyReply, FastifyRequest } from 'fastify';

import IUpdateUserInfoDTO from './IUpdateUserInfoDTO';
import UpdateUserInfoCase from './UpdateUserInfoCase';
import UpdateUserInfoVerifications from './UpdateUserInfoVerifications';

class UpdateUserInfoController {
  constructor(
    private updateUserInfoVerifications: UpdateUserInfoVerifications,
    private updateUserInfoCase: UpdateUserInfoCase,
  ) {}

  async handle(req: FastifyRequest<IUpdateUserInfoDTO>, res: FastifyReply) {
    this.updateUserInfoVerifications.execute(req);

    await this.updateUserInfoCase.execute(req);

    return res.status(200).send({ message: 'Dados editados com sucesso' });
  }
}

export default UpdateUserInfoController;
