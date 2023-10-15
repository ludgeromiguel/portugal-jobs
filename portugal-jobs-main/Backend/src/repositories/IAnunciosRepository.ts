import Anuncios from '@entities/Anuncios';

interface IAnunciosRepository {
  findById(id: string): Promise<Anuncios | null>;
  getAll(): Promise<Anuncios[] | null>;
  getByFilter(
    filtros: GetAnunciosWithFilters, offset: number, limit: number): Promise<Anuncios[] | null>;
  create(anuncio: Anuncios): Promise<Anuncios>;
  update(anuncio: Anuncios): Promise<Anuncios>;
  delete(id: string): Promise<boolean>;
  countAnunciosbyFilter(
    filtros: GetAnunciosWithFilters
  ): Promise<number>;
  countAnunciosByUser(
    userId: string
  ): Promise<number>;
  getUserAnunciosWithPagination(
    userId: string, pageSize: number, pageIndex: number): Promise<Anuncios[]>;
}

export default IAnunciosRepository;
