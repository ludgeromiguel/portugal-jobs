import { FastifyInstance, FastifyRequest } from 'fastify';

import IUsersRepository from '@repositories/IUsersRepository';
import IUserTokensRepository from '@repositories/IUserTokensRepository';
import AppError from '@errors/AppError';
import { generateToken } from '@shared/index';
import IUserLoginAccountDTO from './IUserLoginAccountDTO';

class UserLoginAccountCase {
  constructor(
    private server: FastifyInstance,
    private usersRepository: IUsersRepository,
    private userTokensRepository: IUserTokensRepository,
  ) {}

  async execute(req: FastifyRequest<IUserLoginAccountDTO>): Promise<string> {
    const { username, password } = req.body;

    const userDB = await this.usersRepository.findByUsername(username);
    if (!userDB) throw new AppError('Username ou password incorretos', 401);

    const passwordMatch = await this.server.bcrypt.compare(password, userDB.password);
    if (!passwordMatch) throw new AppError('Username ou password incorretos', 401);

    const userToken = generateToken({ id: userDB.id, date: new Date() }, this.server);

    if (!(await this.userTokensRepository.addToken(userDB.id, userToken))) throw new AppError('Ocorreu um erro ao criar o token', 500);

    return userToken;
  }
}

export default UserLoginAccountCase;
