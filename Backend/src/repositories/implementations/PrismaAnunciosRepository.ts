import { PrismaClient } from '@prisma/client';

import Anuncios from '@entities/Anuncios';
import IAnunciosRepository from '@repositories/IAnunciosRepository';

class PrismaAnunciosRepository implements IAnunciosRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findById(id: string): Promise<Anuncios> {
    return this.prisma.anuncios.findUnique({ where: { id } });
  }

  async getAll(): Promise<Anuncios[]> {
    return this.prisma.anuncios.findMany();
  }

  async getByFilter(
    filtros: GetAnunciosWithFilters,
    offset: number,
    limit: number,
  ): Promise<Anuncios[]> {
    return this.prisma.anuncios.findMany({
      skip: Number(offset),
      take: Number(limit),
      where: filtros,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(anuncio: Anuncios): Promise<Anuncios> {
    return this.prisma.anuncios.create({ data: anuncio });
  }

  async update(anuncio: Anuncios): Promise<Anuncios> {
    anuncio.updatedAt = new Date();
    return this.prisma.anuncios.update({ where: { id: anuncio.id }, data: anuncio });
  }

  async delete(id: string): Promise<boolean> {
    return !!(await this.prisma.anuncios.delete({ where: { id } }));
  }

  async countAnunciosbyFilter(
    filtros: GetAnunciosWithFilters,
  ): Promise<number> {
    return this.prisma.anuncios.count({ where: filtros });
  }

  async countAnunciosByUser(
    userId: string,
  ): Promise<number> {
    return this.prisma.anuncios.count({ where: { ownerID: userId } });
  }

  getUserAnunciosWithPagination(
    userId: string,
    pageSize: number,
    pageIndex: number,
  ): Promise<Anuncios[]> {
    return this.prisma.anuncios.findMany({
      skip: (pageIndex - 1) * pageSize,
      take: pageSize,
      where: { ownerID: userId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

export default PrismaAnunciosRepository;
