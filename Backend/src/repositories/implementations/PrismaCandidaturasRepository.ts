import { PrismaClient } from '@prisma/client';

import ICandidaturasRepository from '@repositories/ICandidaturasRepository';
import Candidaturas from '@entities/Candidaturas';

class PrismaCandidaturasRepository implements ICandidaturasRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findById(id: string): Promise<Candidaturas> {
    return this.prisma.candidaturas.findUnique({ where: { id } });
  }

  async getAllCandidaturasByAnuncioId(anuncioID: string): Promise<Candidaturas[]> {
    return this.prisma.candidaturas.findMany({ where: { anuncioID } });
  }

  async getAllCandidaturasByOwnerId(ownerID: string): Promise<Candidaturas[]> {
    return this.prisma.candidaturas.findMany({ where: { ownerID } });
  }

  async create(candidatura: Candidaturas): Promise<Candidaturas> {
    return this.prisma.candidaturas.create({ data: candidatura });
  }

  async update(candidatura: Candidaturas): Promise<Candidaturas> {
    candidatura.updatedAt = new Date();
    return this.prisma.candidaturas.update({ where: { id: candidatura.id }, data: candidatura });
  }

  async delete(id: string): Promise<boolean> {
    return !!(await this.prisma.candidaturas.delete({ where: { id } }));
  }

  async deleteByAnuncioID(anuncioID: string): Promise<boolean> {
    return !!(await this.prisma.candidaturas.deleteMany({ where: { anuncioID } }));
  }

  async countCandidaturasByAnuncio(anuncioID: string): Promise<number> {
    return this.prisma.candidaturas.count({ where: { anuncioID } });
  }

  async countCandidaturasByUser(userID: string): Promise<number> {
    return this.prisma.candidaturas.count({ where: { ownerID: userID } });
  }

  async getCandidaturasByAnuncioWithPagination(
    anuncioID:string,
    offset:number,
    limit:number,
  ): Promise<Candidaturas[]> {
    return this.prisma.candidaturas.findMany({
      skip: Number(offset),
      take: Number(limit),
      where: { anuncioID },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        owner: true,
      },
    });
  }

  async getCandidaturasByUserWithPagination(
    userID: string,
    offset:number,
    limit:number,
  ): Promise<Candidaturas[]> {
    return this.prisma.candidaturas.findMany({
      skip: Number(offset),
      take: Number(limit),
      where: { ownerID: userID },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        anuncio: true,
      },
    });
  }

  async getCandidaturaByOwnerAndAnuncio(ownerID: string, anuncioID: string): Promise<Candidaturas> {
    return this.prisma.candidaturas.findFirst({ where: { ownerID, anuncioID } });
  }
}

export default PrismaCandidaturasRepository;
