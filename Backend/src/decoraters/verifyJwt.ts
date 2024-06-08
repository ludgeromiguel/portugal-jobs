import { FastifyRequest } from 'fastify';
import { parse } from 'path';

import AppError from '@errors/AppError';
import { BEARRER_REGEX } from '@constants/index';
import { DecoratersInterface } from 'src/@types/DecoratersInterface';
import { verifyUUID } from '@shared/index';

const verifyJwt = ({ server, userTokensRepository }: DecoratersInterface) => {
  server.decorate(parse(__filename).name, async (req: FastifyRequest) => {
    const token = req.headers.authorization;

    if (!token) throw new AppError('Token não fornecido', 401);

    const tokenParts = token.split(' ');

    if (tokenParts.length !== 2) throw new AppError('Token inválido', 401);

    const [scheme, tokenValue] = tokenParts;

    if (!BEARRER_REGEX.test(scheme)) throw new AppError('Token inválido', 401);

    const dataJWT = server.jwt.decode<DecodedJWTToken>(tokenValue, { complete: true });

    if (!dataJWT || !dataJWT.payload || !dataJWT.payload.id) throw new AppError('Token inválido', 401);

    const userTokens = await userTokensRepository.getTokens(dataJWT.payload.id);

    if (!userTokens || userTokens.length === 0 || !userTokens.includes(tokenValue)) throw new AppError('Token inválido', 401);

    if (verifyUUID(dataJWT.payload.id)) throw new AppError('Token inválido', 401);

    req.userID = dataJWT.payload.id;
  });
};

export default verifyJwt;
