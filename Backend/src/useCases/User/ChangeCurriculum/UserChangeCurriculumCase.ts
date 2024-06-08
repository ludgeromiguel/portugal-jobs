import { FastifyRequest } from 'fastify';

import IUsersRepository from '@repositories/IUsersRepository';
import AppError from '@errors/AppError';
import IStorageProvider from '@providers/IStorageProvider';

class UserChangeCurriculumCase {
  constructor(
    private usersRepository: IUsersRepository,
    private storageProvider: IStorageProvider,
  ) {}

  async execute(req: FastifyRequest): Promise<void> {
    let userDB = await this.usersRepository.findById(req.userID);

    if (!userDB) throw new AppError('O utilizador não existe', 401);

    if (userDB.curriculo) {
      if (!(await this.storageProvider.deleteFile(userDB.curriculo))) throw new AppError('Erro ao apagar o currículo antigo', 500);
    }

    const fileID = await this.storageProvider.saveFile(req.pdfFilePath);

    if (!fileID) throw new AppError('Erro ao guardar o currículo', 500);

    userDB.curriculo = fileID;

    userDB = await this.usersRepository.update(userDB);

    if (!userDB) throw new AppError('Erro ao guardar o currículo', 500);
  }
}

export default UserChangeCurriculumCase;
