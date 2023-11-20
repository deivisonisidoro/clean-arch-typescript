export interface IGenerateRefreshTokenProvider{
  generateToken(token: string): Promise<string>
}
