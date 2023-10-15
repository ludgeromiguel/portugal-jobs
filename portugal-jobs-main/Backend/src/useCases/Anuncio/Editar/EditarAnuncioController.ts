import { FastifyReply, FastifyRequest } from 'fastify';

import EditarAnuncioCase from './EditarAnuncioCase';
import EditarAnuncioVerifications from './EditarAnuncioVerifications';
import IEditarAnuncioDTO from './IEditarAnuncioDTO';

class EditarAnuncioController {
  constructor(
    private editarAnuncioVerifications: EditarAnuncioVerifications,
    private editarAnuncioCase: EditarAnuncioCase,
  ) {}

  async handle(req: FastifyRequest<IEditarAnuncioDTO>, res: FastifyReply) {
    this.editarAnuncioVerifications.execute(req);

    const anuncio = await this.editarAnuncioCase.execute(req, req.userID);

    return res.status(200).send({ message: 'Anúncio editado com sucesso', anuncio });
  }
}

export default EditarAnuncioController;
