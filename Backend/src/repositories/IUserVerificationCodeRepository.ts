interface IUserVerificationCodeRepository {
  getVerificationCode(userID: string): Promise<VerificationCode | null>;
  setVerificationCode(userID: string, verificationCode: string): Promise<boolean>;
  delVerificationCode(userID: string): Promise<boolean>
}

export default IUserVerificationCodeRepository;
