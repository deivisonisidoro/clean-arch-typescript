import { ResponseDTO } from '../../application/dtos/Response'

export interface IDeleteUserUseCase {
  execute(userId: string): Promise<ResponseDTO>
}
