import { FastifyRequest } from 'fastify';

import IAnunciosRepository from '@repositories/IAnunciosRepository';
import IUsersRepository from '@repositories/IUsersRepository';
import AppError from '@errors/AppError';
import Anuncios from '@entities/Anuncios';
import IEditarAnuncioDTO from './IEditarAnuncioDTO';

class EditarAnuncioCase {
  constructor(
    private userRepository : IUsersRepository,
    private anunciosRepository: IAnunciosRepository,
  ) {}

  async execute(req: FastifyRequest<IEditarAnuncioDTO>, userID: string): Promise<Anuncios> {
    const {
      local,
      salary,
      isNegotiable,
      role,
      typeJob,
      description,
      requirements,
      contractType,
    } = req.body;
    const {
      anuncioID,
    } = req.params;

    const userDB = await this.userRepository.findById(userID);
    if (!userDB) throw new AppError('O utilizador não existe', 401);

    let anuncioDB = await this.anunciosRepository.findById(anuncioID);
    if (!anuncioDB) throw new AppError('O anúncio não existe.', 404);

    if (anuncioDB.ownerID !== userID) throw new AppError('Não tens permissão para alterar este anúncio', 401);

    if (local) anuncioDB.local = local;
    if (salary) anuncioDB.salary = salary;
    if (isNegotiable) anuncioDB.isNegotiable = isNegotiable;
    if (role) anuncioDB.role = role;
    if (typeJob) anuncioDB.typeJob = typeJob.toLowerCase();
    if (description) anuncioDB.description = description;
    if (requirements) anuncioDB.requirements = requirements;
    if (contractType) anuncioDB.contractType = contractType;

    anuncioDB = await this.anunciosRepository.update(anuncioDB);
    if (!anuncioDB) throw new AppError('Erro a editar o anúncio', 500);

    return anuncioDB;
  }
}

export default EditarAnuncioCase;
