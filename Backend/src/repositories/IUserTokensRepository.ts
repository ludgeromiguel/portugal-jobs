interface IUserTokensRepository {
  getTokens(userID: string): Promise<string[] | null>;
  addToken(userID: string, token: string): Promise<boolean>;
  delToken(userID: string, token?: string): Promise<boolean>
}

export default IUserTokensRepository;
