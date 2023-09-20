import { ResponseDTO } from '../../dtos/Response'

export interface IDeleteUserUseCase {
  execute(userId: string): Promise<ResponseDTO>
}
