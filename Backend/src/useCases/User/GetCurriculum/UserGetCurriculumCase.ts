import { FastifyRequest } from 'fastify';

import AppError from '@errors/AppError';
import IStorageProvider from '@providers/IStorageProvider';
import IUsersRepository from '@repositories/IUsersRepository';
import IUserGetPDFDTO from './IUserGetCurriculumDTO';

class UserGetPDFCase {
  constructor(
    private usersRepository: IUsersRepository,
    private storageProvider: IStorageProvider,
  ) {}

  async execute(req: FastifyRequest<IUserGetPDFDTO>): Promise<string> {
    const { username } = req.params;
    const { userID } = req;

    const userRequestDB = await this.usersRepository.findById(userID);
    if (!userRequestDB) throw new AppError('Utilizador não autenticado', 401);

    const userToCurriculumDB = await this.usersRepository.findByUsername(username);
    if (!userToCurriculumDB) throw new AppError('Utilizador não existe', 404);

    if (!userToCurriculumDB.curriculo) throw new AppError('Utilizador não tem currículo', 404);

    const curriculo = await this.storageProvider.getFile(userToCurriculumDB.curriculo);

    if (!curriculo) throw new AppError('Não foi possível obter o currículo', 500);

    return curriculo;
  }
}

export default UserGetPDFCase;
