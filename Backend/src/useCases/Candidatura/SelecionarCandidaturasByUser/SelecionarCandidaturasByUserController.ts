import { FastifyReply, FastifyRequest } from 'fastify';

import ISelecionarCandidaturasByUserDTO from './ISelecionarCandidaturasByUserDTO';
import SelecionarCandidaturasByUserCase from './SelecionarCandidaturasByUserCase';
import SelecionarCandidaturasByUserVerifications from './SelecionarCandidaturasByUserVerifications';

class SelecionarCandidaturasByUserController {
  constructor(
    private selecionarCandidaturasByUserVerifications:
    SelecionarCandidaturasByUserVerifications,
    private selecionarCandidaturasByUserCase: SelecionarCandidaturasByUserCase,
  ) {}

  async handle(req: FastifyRequest<ISelecionarCandidaturasByUserDTO>, res: FastifyReply) {
    this.selecionarCandidaturasByUserVerifications.execute(req);

    const data = await this.selecionarCandidaturasByUserCase.execute(req);

    return res.status(200).send({
      message: 'Candidaturas selecionadas com sucesso.',
      candidaturas: data.candidaturas,
      paginas: data.paginas,
      paginaAtual: data.paginaAtual,
      nRegistos: data.nRegistos,
    });
  }
}

export default SelecionarCandidaturasByUserController;
