import Users from '@entities/Users';

interface IUsersRepository {
  findByEmail(email: string): Promise<Users | null>;
  findByUsername(username: string): Promise<Users | null>;
  findById(id: string): Promise<Users | null>;
  create(user: Users): Promise<Users>;
  update(user: Users): Promise<Users>;
  delete(id: string): Promise<boolean>;
}

export default IUsersRepository;
