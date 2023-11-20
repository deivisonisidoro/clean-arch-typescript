export interface IRefreshTokenProvider{
  create(user_id: string): Promise<any>;
  findId(refresh_token: string): Promise<any>;
  save(user: any): Promise<void>;
  generateToken(token: string): Promise<string>;
  delete(id: string): Promise<void>;
}
