import { v4 as uuid } from 'uuid';

import Anuncios from './Anuncios';
import Candidaturas from './Candidaturas';

class Users {
  public readonly id: string;

  public firstName: string;

  public lastName: string;

  public email: string;

  public username: string;

  public password: string;

  public number: number;

  public isVerified: boolean;

  public curriculo?: string;

  public createdAt: Date;

  public updatedAt: Date;

  public readonly Anuncios?: Anuncios[];

  public readonly Candidaturas?: Candidaturas[];

  constructor(props: Omit<Users, 'id' | 'isVerified' | 'createdAt' | 'updatedAt'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}

export default Users;
