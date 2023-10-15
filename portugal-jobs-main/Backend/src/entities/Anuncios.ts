import { v4 as uuid } from 'uuid';

import Users from './Users';
import Candidaturas from './Candidaturas';

class Anuncios {
  public readonly id: string;

  public readonly ownerID: string;

  public companyName: string;

  public local: string;

  public description: string;

  public salary: number;

  public isNegotiable: boolean;

  public role: string;

  public typeJob: string;

  public requirements?: string;

  public contractType: string;

  public createdAt: Date;

  public updatedAt: Date;

  public readonly owner?: Users;

  public readonly candidaturas?: Candidaturas[];

  constructor(props: Omit<Anuncios, 'id' | 'createdAt' | 'updatedAt'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}

export default Anuncios;
