import Candidaturas from '@entities/Candidaturas';

interface ICandidaturasRepository {
  findById(id: string): Promise<Candidaturas | null>;
  getAllCandidaturasByAnuncioId(anuncioID: string): Promise<Candidaturas[] | null>;
  getAllCandidaturasByOwnerId(ownerID: string): Promise<Candidaturas[] | null>;
  create(candidatura: Candidaturas): Promise<Candidaturas>;
  update(candidatura: Candidaturas): Promise<Candidaturas>;
  delete(id: string): Promise<boolean>;
  deleteByAnuncioID(anuncioID: string): Promise<boolean>;
  countCandidaturasByAnuncio(anuncioID: string): Promise<number>;
  getCandidaturasByAnuncioWithPagination(
    anuncioID: string, offset: number, limit: number): Promise<Candidaturas[]>;
  countCandidaturasByUser(userID: string): Promise<number>;
  getCandidaturasByUserWithPagination(
    userID: string, offset: number, limit: number): Promise<Candidaturas[]>;
  getCandidaturaByOwnerAndAnuncio(ownerID: string, anuncioID: string): Promise<Candidaturas>;
}

export default ICandidaturasRepository;
