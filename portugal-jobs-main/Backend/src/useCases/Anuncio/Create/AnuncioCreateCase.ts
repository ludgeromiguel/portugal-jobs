import { FastifyRequest } from 'fastify';

import IUsersRepository from '@repositories/IUsersRepository';
import IAnunciosRepository from '@repositories/IAnunciosRepository';
import AppError from '@errors/AppError';
import Anuncios from '@entities/Anuncios';
import IAnuncioCreateDTO from './IAnuncioCreateDTO';

class AnuncioCreateCase {
  constructor(
    private usersRepository: IUsersRepository,
    private anunciosRepository : IAnunciosRepository,
  ) {}

  async execute(req: FastifyRequest<IAnuncioCreateDTO>): Promise<Anuncios> {
    const {
      companyName, local, salary, isNegotiable,
      role, typeJob, description, contractType, requirements,
    } = req.body;
    const { userID } = req;

    const userDB = await this.usersRepository.findById(userID);
    if (!userDB) throw new AppError('O utilizador não existe', 401);

    const AnuncioClass = new Anuncios({
      ownerID: userID,
      companyName,
      local,
      salary,
      isNegotiable,
      role,
      typeJob: typeJob.toLowerCase(),
      description,
      requirements,
      contractType,
    });

    const newAnuncioDB = await this.anunciosRepository.create(AnuncioClass);

    return newAnuncioDB;
  }
}

export default AnuncioCreateCase;
