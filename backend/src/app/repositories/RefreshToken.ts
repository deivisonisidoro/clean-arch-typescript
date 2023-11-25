import { RefreshTokenDTO } from "../../domain/dtos/RefreshToken";

export interface IRefreshTokenRepository{
  create(user_id: string): Promise<RefreshTokenDTO>;
  findById(id: string): Promise<RefreshTokenDTO | unknown>;
  findByUserId(user_id: string): Promise<RefreshTokenDTO | unknown>;
  delete(user_id: string): Promise<void>;
}
