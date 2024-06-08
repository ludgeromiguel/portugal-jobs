import { v4 as uuid } from 'uuid';

import Users from './Users';
import Anuncios from './Anuncios';

class Candidaturas {
  public readonly id: string;

  public readonly ownerID: string;

  public readonly anuncioID: string;

  public status?: number;

  public createdAt: Date;

  public updatedAt: Date;

  public readonly owner?: Users;

  public readonly anuncio?: Anuncios;

  constructor(props: Omit<Candidaturas, 'id' | 'createdAt' | 'updatedAt'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}

export default Candidaturas;
