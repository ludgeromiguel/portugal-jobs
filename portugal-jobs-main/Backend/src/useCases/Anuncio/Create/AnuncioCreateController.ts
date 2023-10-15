import { FastifyReply, FastifyRequest } from 'fastify';

import AppError from '@errors/AppError';
import IAnuncioCreateDTO from './IAnuncioCreateDTO';
import AnuncioCreateCase from './AnuncioCreateCase';
import AnuncioCreateVerifications from './AnuncioCreateVerification';

class AnuncioCreateController {
  constructor(
    private anuncioCreateVerifications: AnuncioCreateVerifications,
    private anuncioCreateCase: AnuncioCreateCase,
  ) {}

  async handle(req: FastifyRequest<IAnuncioCreateDTO>, res: FastifyReply) {
    this.anuncioCreateVerifications.execute(req);

    const anuncio = await this.anuncioCreateCase.execute(req);

    if (!anuncio) throw new AppError('Erro ao criar o anúncio', 500);

    return res.status(201).send({ anuncio, message: 'Anúncio criado com sucesso' });
  }
}

export default AnuncioCreateController;
