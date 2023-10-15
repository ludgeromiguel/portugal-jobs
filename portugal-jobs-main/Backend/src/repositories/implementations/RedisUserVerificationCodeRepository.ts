import { FastifyRedis } from '@fastify/redis';

import IUserVerificationCodeRepository from '@repositories/IUserVerificationCodeRepository';
import { convertMillisecondsToSeconds, convertMinutesToMilliseconds } from '@shared/utils';

class RedisUserVerificationCodeRepository implements IUserVerificationCodeRepository {
  private readonly redis: FastifyRedis;

  private readonly keyPrefix: string;

  private readonly verificationCodeDurateTimeMin: number;

  private readonly verificationCodeTimeTimeSec: number;

  constructor(redis: FastifyRedis) {
    this.redis = redis;
    this.keyPrefix = 'userVerificationCode';
    this.verificationCodeDurateTimeMin = 30;
    this.verificationCodeTimeTimeSec = convertMillisecondsToSeconds(
      convertMinutesToMilliseconds(this.verificationCodeDurateTimeMin),
    );
  }

  async getVerificationCode(userID: string): Promise<VerificationCode | null> {
    const data = await this.redis.get(`${this.keyPrefix}:${userID}`);

    if (!data || data === '') return null;

    return JSON.parse(data) as VerificationCode;
  }

  async setVerificationCode(userID: string, verificationCode: string): Promise<boolean> {
    const tokenData: VerificationCode = {
      verificationCode,
      endDateTime: new Date(
        Date.now() + convertMinutesToMilliseconds(this.verificationCodeDurateTimeMin),
      ),
    };

    return !!(await this.redis.set(`${this.keyPrefix}:${userID}`, JSON.stringify(tokenData), 'EX', this.verificationCodeTimeTimeSec));
  }

  async delVerificationCode(userID: string): Promise<boolean> {
    return !!(await this.redis.del(`${this.keyPrefix}:${userID}`));
  }
}

export default RedisUserVerificationCodeRepository;
