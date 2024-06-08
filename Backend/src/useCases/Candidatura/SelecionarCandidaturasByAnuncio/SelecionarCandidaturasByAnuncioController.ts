import { FastifyReply, FastifyRequest } from 'fastify';

import ISelecionarCandidaturasByAnuncioDTO from './ISelecionarCandidaturasByAnuncioDTO';
import SelecionarCandidaturasByAnuncioCase from './SelecionarCandidaturasByAnuncioCase';
import SelecionarCandidaturasByAnuncioVerifications from './SelecionarCandidaturasByAnuncioVerifications';

class SelecionarCandidaturasByAnuncioController {
  constructor(
    private selecionarCandidaturasByAnuncioVerifications:
    SelecionarCandidaturasByAnuncioVerifications,
    private selecionarCandidaturasByAnuncioCase: SelecionarCandidaturasByAnuncioCase,
  ) {}

  async handle(req: FastifyRequest<ISelecionarCandidaturasByAnuncioDTO>, res: FastifyReply) {
    this.selecionarCandidaturasByAnuncioVerifications.execute(req);

    const data = await this.selecionarCandidaturasByAnuncioCase.execute(req);

    return res.status(200).send({
      message: 'Candidaturas selecionadas com sucesso.',
      candidaturas: data.candidaturas,
      paginas: data.paginas,
      paginaAtual: data.paginaAtual,
      nRegistos: data.nRegistos,
    });
  }
}

export default SelecionarCandidaturasByAnuncioController;
