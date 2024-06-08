import { FastifyRequest } from 'fastify';

import AppError from '@errors/AppError';
import Anuncios from '@entities/Anuncios';
import IAnunciosRepository from '@repositories/IAnunciosRepository';
import IUsersRepository from '@repositories/IUsersRepository';
import IGetAnunciosWithFilters from './IGetManyAnunciosDTO';

interface GetManyAnunciosReturnData {
  anuncios: Anuncios[],
  paginas: number,
  paginaAtual: number,
  nRegistos: number
}

class GetManyAnunciosCase {
  constructor(
    private userRepository: IUsersRepository,
    private anunciosRepository: IAnunciosRepository,
  ) {}

  async execute(
    req: FastifyRequest<IGetAnunciosWithFilters>,
    userID: string,
  ): Promise<GetManyAnunciosReturnData> {
    const {
      local,
      salary,
      typeJob,
      role,
      contractType,
      pageIndex,
      pageSize,
    } = req.query;

    const userDB = await this.userRepository.findById(userID);
    if (!userDB) throw new AppError('O utilizador não existe', 401);

    const filters : GetAnunciosWithFilters = {};
    if (local) filters.local = { contains: local };
    if (salary) filters.salary = { gte: Number(salary) };
    if (typeJob) filters.typeJob = typeJob.toLowerCase();
    if (role) filters.role = { contains: role };
    if (contractType) filters.contractType = contractType;

    const nRegistos = await this.anunciosRepository.countAnunciosbyFilter(filters);
    if (!nRegistos || nRegistos === 0) throw new AppError('Não existem registos', 404);

    const paginas = Math.ceil(nRegistos / pageSize);
    if (pageIndex > paginas) throw new AppError('Número de página inválida.', 404);

    const offset = (pageIndex * pageSize) - pageSize;

    const anunciosDB = await this.anunciosRepository.getByFilter(
      filters,
      offset,
      pageSize,
    );

    return {
      anuncios: anunciosDB,
      paginas,
      paginaAtual: pageIndex,
      nRegistos,
    };
  }
}

export default GetManyAnunciosCase;
