import { FastifyReply, FastifyRequest } from 'fastify';

import ApagarCandidaturaCase from './ApagarCandidaturaCase';
import ApagarCandidaturaVerifications from './ApagarCandidaturaVerifications';
import IApagarCandidaturaDTO from './IApagarCandidaturaDTO';

class ApagarCandidaturaController {
  constructor(
    private apagarCandidaturaVerifications: ApagarCandidaturaVerifications,
    private apagarCandidaturaCase: ApagarCandidaturaCase,
  ) {}

  async handle(req: FastifyRequest<IApagarCandidaturaDTO>, res: FastifyReply) {
    this.apagarCandidaturaVerifications.execute(req);

    await this.apagarCandidaturaCase.execute(req);

    return res.status(200).send({ message: 'Candidatura apagada com sucesso.' });
  }
}

export default ApagarCandidaturaController;
