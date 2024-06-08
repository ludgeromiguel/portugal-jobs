import { FastifyReply, FastifyRequest } from 'fastify';

import GetOneAnuncioCase from './GetOneAnuncioCase';
import GetOneAnuncioVerifications from './GetOneAnuncioVerifications';
import IGetOneAnuncioDTO from './IGetOneAnuncioDTO';

class GetOneAnuncioController {
  constructor(
    private getOneAnuncioVerifications: GetOneAnuncioVerifications,
    private getOneAnuncioCase: GetOneAnuncioCase,
  ) {}

  async handle(req: FastifyRequest<IGetOneAnuncioDTO>, res: FastifyReply) {
    this.getOneAnuncioVerifications.execute(req);

    const dataAnuncio = await this.getOneAnuncioCase.execute(req);

    const { anuncioDB, IsCandidatado } = dataAnuncio;

    return res.status(200).send({ anuncio: anuncioDB, IsCandidatado, message: 'Anúncio selecionado com sucesso.' });
  }
}

export default GetOneAnuncioController;
