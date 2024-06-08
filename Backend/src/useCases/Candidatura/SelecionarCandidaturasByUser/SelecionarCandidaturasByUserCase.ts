import { FastifyRequest } from 'fastify';

import AppError from '@errors/AppError';
import IUsersRepository from '@repositories/IUsersRepository';
import ICandidaturasRepository from '@repositories/ICandidaturasRepository';
import Candidaturas from '@entities/Candidaturas';
import ISelecionarCandidaturasByUserDTO from './ISelecionarCandidaturasByUserDTO';

type CandidaturasWithUser = Candidaturas &
{ nomeAnuncio: string, nomeCompanhia: string };

interface GetManyCandidaturasReturnData {
  candidaturas: CandidaturasWithUser[],
  paginas: number,
  paginaAtual: number,
  nRegistos: number,
}

class SelecionarCandidaturasByUserCase {
  constructor(
    private usersRepository: IUsersRepository,
    private candidaturasRepository : ICandidaturasRepository,
  ) {}

  async execute(req: FastifyRequest<ISelecionarCandidaturasByUserDTO>):
  Promise<GetManyCandidaturasReturnData> {
    const { userID } = req;
    const {
      pageSize,
      pageIndex,
    } = req.query;

    const userDB = await this.usersRepository.findById(userID);
    if (!userDB) throw new AppError('O utilizador não existe', 401);

    const nRegistos = await this.candidaturasRepository.countCandidaturasByUser(userID);
    if (!nRegistos || nRegistos === 0) throw new AppError('Não existem candidaturas', 404);

    const paginas = Math.ceil(nRegistos / pageSize);
    if (pageIndex > paginas) throw new AppError('Número de página inválida.', 404);

    const offset = (pageIndex * pageSize) - pageSize;

    const candidaturasDB: Candidaturas[] = await
    this.candidaturasRepository.getCandidaturasByUserWithPagination(
      userID,
      offset,
      pageSize,
    );

    if (!candidaturasDB) throw new AppError('Ocorreu um erro a selecionar as candidaturas', 500);

    const candidaturasWithUser: CandidaturasWithUser[] = [];

    for (const candidatura of candidaturasDB) {
      const { anuncio, ...candidaturaData } = candidatura;

      candidaturasWithUser.push({
        ...candidaturaData,
        nomeAnuncio: anuncio.role,
        nomeCompanhia: anuncio.companyName,
      });
    }

    return {
      candidaturas: candidaturasWithUser,
      paginas,
      paginaAtual: pageIndex,
      nRegistos,
    };
  }
}

export default SelecionarCandidaturasByUserCase;
