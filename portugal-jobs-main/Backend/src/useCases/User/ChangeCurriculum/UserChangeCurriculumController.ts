import { FastifyReply, FastifyRequest } from 'fastify';

import UserChangeCurriculumCase from './UserChangeCurriculumCase';
import UserChangeCurriculumVerifications from './UserChangeCurriculumVerifications';

class UserChangeCurriculumController {
  constructor(
    private userChangeCurriculumVerifications: UserChangeCurriculumVerifications,
    private userChangeCurriculumCase: UserChangeCurriculumCase,
  ) {}

  async handle(req: FastifyRequest, res: FastifyReply) {
    await this.userChangeCurriculumVerifications.execute(req);

    await this.userChangeCurriculumCase.execute(req);

    return res.status(200).send({ message: 'Currículo alterado com sucesso' });
  }
}

export default UserChangeCurriculumController;
