import { FastifyRequest } from 'fastify';

import IUsersRepository from '@repositories/IUsersRepository';
import IUserTokensRepository from '@repositories/IUserTokensRepository';
import AppError from '@errors/AppError';

class UserLogoutAccountCase {
  constructor(
    private usersRepository: IUsersRepository,
    private usersTokensRepository: IUserTokensRepository,
  ) {}

  async execute(req: FastifyRequest): Promise<void> {
    const { userID } = req;

    const userDB = await this.usersRepository.findById(userID);
    if (!userDB) throw new AppError('O utilizador não existe', 401);

    const userToken = req.headers.authorization.split(' ')[1];

    if (!(await this.usersTokensRepository.delToken(userID, userToken))) throw new AppError('Não foi possível fazer logout', 500);
  }
}

export default UserLogoutAccountCase;
