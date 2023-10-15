import { FastifyInstance, FastifyRequest } from 'fastify';
import { resolve } from 'path';

import IMailProvider from '@providers/IMailProvider';
import IUsersRepository from '@repositories/IUsersRepository';
import AppError from '@errors/AppError';
import Users from '@entities/Users';
import IUserTokensRepository from '@repositories/IUserTokensRepository';
import { generateToken } from '@shared/token';
import IUserCreateAccountDTO from './IUserCreateAccountDTO';

class UserCreateAccountcase {
  constructor(
    private server: FastifyInstance,
    private mailProvider: IMailProvider,
    private usersRepository: IUsersRepository,
    private userTokensRepository: IUserTokensRepository,
  ) {}

  async execute(req: FastifyRequest<IUserCreateAccountDTO>): Promise<string> {
    const {
      email, username, firstName, lastName, number, password,
    } = req.body;

    const userEmailDB = await this.usersRepository.findByEmail(email);
    if (userEmailDB) throw new AppError('Esse email já está em uso', 400);

    const userUsernameDB = await this.usersRepository.findByUsername(username);
    if (userUsernameDB) throw new AppError('Esse nome de utilizador já está em uso', 400);

    const encryptedPassword = await this.server.bcrypt.hash(password);

    const userClass = new Users({
      username,
      email,
      firstName,
      lastName,
      number,
      password: encryptedPassword,
    });

    const newUserDB = await this.usersRepository.create(userClass);

    const htmlPath = resolve(__dirname, '..', '..', '..', 'views', 'emails', 'welcomeMail.hbs');

    await this.mailProvider.sendMail(
      email,
      this.server.env.MAIL_NOREPLY,
      'Bem Vindo ao Portugal Jobs',
      htmlPath,
      { name: [firstName, lastName].join(' ') },
    );

    const userToken = generateToken({ id: newUserDB.id, date: new Date() }, this.server);

    if (!(await this.userTokensRepository.addToken(newUserDB.id, userToken))) throw new AppError('Ocorreu um erro ao criar o token', 500);

    return userToken;
  }
}

export default UserCreateAccountcase;
