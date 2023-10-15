import { FastifyReply, FastifyRequest } from 'fastify';

import AnuncioApagarVerifications from './AnuncioApagarVerifications';
import AnuncioApagarCase from './AnuncioApagarCase';
import IAnuncioApagarDTO from './IAnuncioApagarDTO';

class AnuncioApagarController {
  constructor(
    private anuncioApagarVerifications: AnuncioApagarVerifications,
    private anuncioApagarCase: AnuncioApagarCase,
  ) {}

  async handle(req: FastifyRequest<IAnuncioApagarDTO>, res: FastifyReply) {
    this.anuncioApagarVerifications.execute(req);

    await this.anuncioApagarCase.execute(req);

    return res.status(200).send({ message: 'Anúncio apagado com sucesso' });
  }
}

export default AnuncioApagarController;
