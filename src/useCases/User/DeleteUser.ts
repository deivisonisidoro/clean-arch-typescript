import { ResponseDTO } from '../../applications/dtos/Response'

export interface IDeleteUserUseCase {
  execute(userId: string): Promise<ResponseDTO>
}
