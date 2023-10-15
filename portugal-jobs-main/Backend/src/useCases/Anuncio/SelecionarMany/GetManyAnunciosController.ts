import { FastifyReply, FastifyRequest } from 'fastify';

import GetManyAnunciosCase from './GetManyAnunciosCase';
import GetManyAnunciosVerifications from './GetManyAnunciosVerifications';
import IGetAnunciosWithFilters from './IGetManyAnunciosDTO';

class GetManyAnunciosController {
  constructor(
    private getAnunciosVerifications: GetManyAnunciosVerifications,
    private getManyAnunciosCase: GetManyAnunciosCase,
  ) {}

  async handle(req: FastifyRequest<IGetAnunciosWithFilters>, res: FastifyReply) {
    this.getAnunciosVerifications.execute(req);

    const data = await this.getManyAnunciosCase.execute(req, req.userID);

    return res.status(200).send({
      message: 'Anúncios selecionados com sucesso',
      anuncios: data.anuncios,
      paginas: data.paginas,
      paginaAtual: data.paginaAtual,
      nRegistos: data.nRegistos,
    });
  }
}

export default GetManyAnunciosController;
