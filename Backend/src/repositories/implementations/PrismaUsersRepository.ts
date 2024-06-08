import { PrismaClient } from '@prisma/client';

import IUsersRepository from '@repositories/IUsersRepository';
import Users from '@entities/Users';

class PrismaUsersRepository implements IUsersRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findByEmail(email: string): Promise<Users | null> {
    return this.prisma.users.findUnique({ where: { email } });
  }

  async findByUsername(username: string): Promise<Users> {
    return this.prisma.users.findUnique({ where: { username } });
  }

  async findById(id: string): Promise<Users> {
    return this.prisma.users.findUnique({ where: { id } });
  }

  async create(user: Users): Promise<Users> {
    return this.prisma.users.create({ data: user });
  }

  async update(user: Users): Promise<Users> {
    user.updatedAt = new Date();
    return this.prisma.users.update({ where: { id: user.id }, data: user });
  }

  async delete(id: string): Promise<boolean> {
    return !!(await this.prisma.users.delete({ where: { id } }));
  }
}

export default PrismaUsersRepository;
