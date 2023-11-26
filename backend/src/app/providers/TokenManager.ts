export interface ITokenManagerProvider{
  validateTokenAge(expires_in: number): boolean;
  validateToken(token: string): boolean
}
