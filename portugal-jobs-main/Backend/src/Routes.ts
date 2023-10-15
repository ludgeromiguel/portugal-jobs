import { FastifyInstance, FastifyRequest } from 'fastify';

import RegisterDecoraters from '@handlers/RegisterDecoraters';
import IUserCreateAccountDTO from '@useCases/User/CreateAccount/IUserCreateAccountDTO';
import userCreateAccount from '@useCases/User/CreateAccount';
import IAnuncioCreateDTO from '@useCases/Anuncio/Create/IAnuncioCreateDTO';
import anuncioCreate from '@useCases/Anuncio/Create';
import IUserLoginAccountDTO from '@useCases/User/LoginAccount/IUserLoginAccountDTO';
import userLoginAccount from '@useCases/User/LoginAccount';
import {
  UserCreateAccount, UserLoginAccount, AnuncioCreate, UserGetVerifyAccountCode, UserVerifyAccount,
  ApagarAnuncio, UserGetInfo, EditarAnuncio, CandidatarAnuncio, UserLogoutAccount,
  UserChangeCurriculum, GetAnuncios, UserUpdateInfo, UserGetCurriculum, UserGetAnuncios,
  GetAnuncio, ApagarCandidatura, SelecionarCandidaturasByAnuncio, SelecionarCandidaturasByUser,
} from '@schemas/index';
import userGetVerifyAccountcode from '@useCases/User/GetVerifyAccountCode';
import userVerifyAccount from '@useCases/User/VerifyAccount';
import IUserVerifyAccountDTO from '@useCases/User/VerifyAccount/IUserVerifyAccountDTO';
import apagarAnuncio from '@useCases/Anuncio/Apagar';
import IAnuncioApagarDTO from '@useCases/Anuncio/Apagar/IAnuncioApagarDTO';
import userGetUserInfo from '@useCases/User/GetUserInfo';
import IEditarAnuncioDTO from '@useCases/Anuncio/Editar/IEditarAnuncioDTO';
import editarAnuncio from '@useCases/Anuncio/Editar';
import IAnuncioCandidatarDTO from '@useCases/Anuncio/Candidatar/IAnuncioCandidatarDTO';
import candidatarAnuncio from '@useCases/Anuncio/Candidatar';
import userLogouAccount from '@useCases/User/LogoutAccount';
import userChangeCurriculum from '@useCases/User/ChangeCurriculum';
import getManyAnuncios from '@useCases/Anuncio/SelecionarMany';
import IGetManyAnunciosDTO from '@useCases/Anuncio/SelecionarMany/IGetManyAnunciosDTO';
import userUpdateUserInfo from '@useCases/User/UpdateUserInfo';
import IUpdateUserInfoDTO from '@useCases/User/UpdateUserInfo/IUpdateUserInfoDTO';
import IUserGetCurriculumDTO from '@useCases/User/GetCurriculum/IUserGetCurriculumDTO';
import userGetCurriculum from '@useCases/User/GetCurriculum';
import IGetOneAnuncioDTO from '@useCases/Anuncio/SelecionarOneAnuncio/IGetOneAnuncioDTO';
import getOneAnuncio from '@useCases/Anuncio/SelecionarOneAnuncio';
import IApagarCandidaturaDTO from '@useCases/Candidatura/ApagarCandidatura/IApagarCandidaturaDTO';
import apagarCandidatura from '@useCases/Candidatura/ApagarCandidatura';
import ISelecionarCandidaturasByAnuncioDTO from '@useCases/Candidatura/SelecionarCandidaturasByAnuncio/ISelecionarCandidaturasByAnuncioDTO';
import selecionarCandidaturasbyAnuncio from '@useCases/Candidatura/SelecionarCandidaturasByAnuncio';
import ISelecionarCandidaturasByUserDTO from '@useCases/Candidatura/SelecionarCandidaturasByUser/ISelecionarCandidaturasByUserDTO';
import selecionarCandidaturasbyUser from '@useCases/Candidatura/SelecionarCandidaturasByUser';
import IGetUserAnunciosDTO from '@useCases/User/GetAnuncios/IGetUserAnunciosDTO';
import getUserAnuncios from '@useCases/User/GetAnuncios';

class Routes {
  async handle(server: FastifyInstance, opts: FastifyRoutesOptions, next: () => void):
  Promise<void> {
    await new RegisterDecoraters(server).handle();

    // Route only for check if server is working
    server.get('/', { schema: { security: [], hide: true } }, (req, res) => res.send({ message: 'Server Is working' }));

    // Users Routes
    server.post('/register', { schema: UserCreateAccount }, (req: FastifyRequest<IUserCreateAccountDTO>, res) => userCreateAccount(server).handle(req, res));

    server.post('/login', { schema: UserLoginAccount }, (req: FastifyRequest<IUserLoginAccountDTO>, res) => userLoginAccount(server).handle(req, res));

    server.delete('/logout', { schema: UserLogoutAccount, preValidation: [server.verifyJwt] }, (req, res) => userLogouAccount(server).handle(req, res));

    server.get('/@me', { schema: UserGetInfo, preValidation: [server.verifyJwt] }, (req, res) => userGetUserInfo(server).handle(req, res));

    server.get('/@me/verificationCode', { schema: UserGetVerifyAccountCode, preValidation: [server.verifyJwt] }, (req, res) => userGetVerifyAccountcode(server).handle(req, res));

    server.put('/@me/verificateAccount', { schema: UserVerifyAccount, preValidation: [server.verifyJwt] }, (req: FastifyRequest<IUserVerifyAccountDTO>, res) => userVerifyAccount(server).handle(req, res));

    server.get('/@me/anuncios', { schema: UserGetAnuncios, preValidation: [server.verifyJwt] }, (req: FastifyRequest<IGetUserAnunciosDTO>, res) => getUserAnuncios(server).handle(req, res));

    server.put('/@me/update/data', { schema: UserUpdateInfo, preValidation: [server.verifyJwt] }, (req: FastifyRequest<IUpdateUserInfoDTO>, res) => userUpdateUserInfo(server).handle(req, res));

    server.put('/@me/change/curriculum', { schema: UserChangeCurriculum, preValidation: [server.verifyJwt] }, (req, res) => userChangeCurriculum(server).handle(req, res));

    server.get('/@me/candidaturas', { schema: SelecionarCandidaturasByUser, preValidation: [server.verifyJwt] }, (req: FastifyRequest<ISelecionarCandidaturasByUserDTO>, res) => selecionarCandidaturasbyUser(server).handle(req, res));

    server.get('/users/:username/curriculum', { schema: UserGetCurriculum, preValidation: [server.verifyJwt] }, (req: FastifyRequest<IUserGetCurriculumDTO>, res) => userGetCurriculum(server).handle(req, res));

    // Anuncios Routes
    server.post('/anuncios', { schema: AnuncioCreate, preValidation: [server.verifyJwt] }, (req: FastifyRequest<IAnuncioCreateDTO>, res) => anuncioCreate(server).handle(req, res));

    server.get('/anuncios', { schema: GetAnuncios, preValidation: [server.verifyJwt] }, (req: FastifyRequest<IGetManyAnunciosDTO>, res) => getManyAnuncios(server).handle(req, res));

    server.delete('/anuncios/:anuncioID', { schema: ApagarAnuncio, preValidation: [server.verifyJwt] }, (req: FastifyRequest<IAnuncioApagarDTO>, res) => apagarAnuncio(server).handle(req, res));

    server.put('/anuncios/:anuncioID', { schema: EditarAnuncio, preValidation: [server.verifyJwt] }, (req:FastifyRequest<IEditarAnuncioDTO>, res) => editarAnuncio(server).handle(req, res));

    server.get('/anuncios/:anuncioID', { schema: GetAnuncio, preValidation: [server.verifyJwt] }, (req:FastifyRequest<IGetOneAnuncioDTO>, res) => getOneAnuncio(server).handle(req, res));

    server.post('/anuncios/:anuncioID/candidatar', { schema: CandidatarAnuncio, preValidation: [server.verifyJwt] }, (req: FastifyRequest<IAnuncioCandidatarDTO>, res) => candidatarAnuncio(server).handle(req, res));

    server.get('/anuncios/:anuncioID/candidaturas', { schema: SelecionarCandidaturasByAnuncio, preValidation: [server.verifyJwt] }, (req: FastifyRequest<ISelecionarCandidaturasByAnuncioDTO>, res) => selecionarCandidaturasbyAnuncio(server).handle(req, res));

    // Candidaturas Routes
    server.delete('/candidaturas/:candidaturaID', { schema: ApagarCandidatura, preValidation: [server.verifyJwt] }, (req:FastifyRequest<IApagarCandidaturaDTO>, res) => apagarCandidatura(server).handle(req, res));

    next();
  }
}

export default Routes;
