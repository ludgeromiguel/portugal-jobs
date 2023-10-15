import { FastifyInstance, FastifyRequest } from 'fastify';

import IUsersRepository from '@repositories/IUsersRepository';
import AppError from '@errors/AppError';
import IUpdateUserInfoDTO from './IUpdateUserInfoDTO';

class UpdateUserInfoCase {
  constructor(
    private server: FastifyInstance,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(req: FastifyRequest<IUpdateUserInfoDTO>): Promise<void> {
    const {
      number,
      password,
    } = req.body;

    let user = await this.usersRepository.findById(req.userID);

    if (!user) throw new AppError('Utilizador não encontrado', 404);

    if (password) {
      if (await this.server.bcrypt.compare(password, user.password)) throw new AppError('A nova password tem que ser diferente da antiga', 400);

      user.password = await this.server.bcrypt.hash(password);
    }

    if (number) {
      if (user.number === number) throw new AppError('O novo número tem que ser diferente do antigo', 400);

      user.number = number;
    }

    user = await this.usersRepository.update(user);

    if (!user) throw new AppError('Ocorreu um erro ao editar os dados do utilizador', 500);
  }
}

export default UpdateUserInfoCase;
