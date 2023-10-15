import { FastifyRequest } from 'fastify';

import IUsersRepository from '@repositories/IUsersRepository';
import Users from '@entities/Users';
import AppError from '@errors/AppError';

class UserGetUserInfoCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(req: FastifyRequest): Promise<Omit<Users, 'password'>> {
    const { userID } = req;

    const userDB = await this.usersRepository.findById(userID);
    if (!userDB) throw new AppError('O utilizador não existe', 401);

    if (!userDB.isVerified) throw new AppError('A tua conta não está verificada', 406);

    delete userDB.password;
    delete userDB.createdAt;
    delete userDB.updatedAt;

    return userDB;
  }
}

export default UserGetUserInfoCase;
