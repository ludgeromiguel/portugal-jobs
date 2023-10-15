import { FastifyReply, FastifyRequest } from 'fastify';

import IAnuncioCandidatarDTO from './IAnuncioCandidatarDTO';
import AnuncioCandidatarCase from './AnuncioCandidatarCase';
import AnuncioCandidatarVerifications from './AnuncioCandidatarVerification';

class AnuncioCandidatarController {
  constructor(
    private anuncioCandidatarVerifications: AnuncioCandidatarVerifications,
    private anuncioCandidatarCase: AnuncioCandidatarCase,
  ) {}

  async handle(req: FastifyRequest<IAnuncioCandidatarDTO>, res: FastifyReply) {
    this.anuncioCandidatarVerifications.execute(req);

    const candidatura = await this.anuncioCandidatarCase.execute(req);

    return res.status(201).send({ candidatura, message: 'Candidatura realizada com sucesso' });
  }
}

export default AnuncioCandidatarController;
