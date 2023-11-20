import { RefreshTokenDTO } from "../../domain/dtos/RefreshToken";

export interface IRefreshTokenRepository{
  create(user_id: string): Promise<RefreshTokenDTO>;
  findId(refresh_token: string): Promise<RefreshTokenDTO | unknown>;
  delete(id: string): Promise<void>;
}
