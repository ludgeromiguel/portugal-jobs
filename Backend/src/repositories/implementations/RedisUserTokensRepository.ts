import { FastifyRedis } from '@fastify/redis';

import IUserTokensRepository from '@repositories/IUserTokensRepository';
import { TOKENSDIVIDER } from '@constants/index';

class RedisUserTokensRepository implements IUserTokensRepository {
  private readonly redis: FastifyRedis;

  private readonly keyPrefix :string;

  constructor(redis: FastifyRedis) {
    this.redis = redis;
    this.keyPrefix = 'userTokens';
  }

  async getTokens(userID: string): Promise<string[]> {
    const data = await this.redis.get(`${this.keyPrefix}:${userID}`);

    if (!data || data === '') return null;

    return data.split(TOKENSDIVIDER);
  }

  async addToken(userID: string, token: string): Promise<boolean> {
    const userTokens = await this.getTokens(userID);

    if (!userTokens) {
      return !!(await this.redis.set(`${this.keyPrefix}:${userID}`, token));
    }

    userTokens.push(token);
    return !!(await this.redis.set(`${this.keyPrefix}:${userID}`, userTokens.join(TOKENSDIVIDER)));
  }

  async delToken(userID: string, token?: string): Promise<boolean> {
    if (!token) {
      return !!(await this.redis.del(`${this.keyPrefix}:${userID}`));
    }

    const userTokens = await this.getTokens(userID);

    if (!userTokens || userTokens.length === 0 || !userTokens.includes(token)) return false;

    if (userTokens.length === 1) {
      return !!(await this.redis.del(`${this.keyPrefix}:${userID}`));
    }

    userTokens.splice(userTokens.indexOf(token), 1);

    return !!(await this.redis.set(`${this.keyPrefix}:${userID}`, userTokens.join(TOKENSDIVIDER)));
  }
}

export default RedisUserTokensRepository;
