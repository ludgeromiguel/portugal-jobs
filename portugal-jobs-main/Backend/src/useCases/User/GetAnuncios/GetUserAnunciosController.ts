import { FastifyReply, FastifyRequest } from 'fastify';

import GetUserAnunciosCase from './GetUserAnunciosCase';
import GetUserAnunciosVerifications from './GetUserAnunciosVerifications';
import IGetUserAnunciosDTO from './IGetUserAnunciosDTO';

class GetUserAnunciosController {
  constructor(
    private getUserAnunciosVerifications: GetUserAnunciosVerifications,
    private getUserAnunciosCase: GetUserAnunciosCase,
  ) {}

  async handle(req: FastifyRequest<IGetUserAnunciosDTO>, res: FastifyReply) {
    this.getUserAnunciosVerifications.execute(req);

    const data = await this.getUserAnunciosCase.execute(req);

    return res.status(200).send({
      message: 'Anúncios selecionados com sucesso.',
      ...data,
    });
  }
}

export default GetUserAnunciosController;
