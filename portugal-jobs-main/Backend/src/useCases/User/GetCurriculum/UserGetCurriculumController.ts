import { FastifyReply, FastifyRequest } from 'fastify';

import IUserGetCurriculumDTO from './IUserGetCurriculumDTO';
import UserGetCurriculumCase from './UserGetCurriculumCase';
import UserGetCurriculumVerifications from './UserGetCurriculumVerifications';

class UserGetCurriculumController {
  constructor(
    private userGetCurriculumVerifications: UserGetCurriculumVerifications,
    private userGetCurriculumCase: UserGetCurriculumCase,
  ) {}

  async handle(req: FastifyRequest<IUserGetCurriculumDTO>, res: FastifyReply) {
    this.userGetCurriculumVerifications.execute(req);

    const curriculo = await this.userGetCurriculumCase.execute(req);

    return res.status(302).redirect(curriculo);
  }
}

export default UserGetCurriculumController;
