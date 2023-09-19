import { ResponseDTO } from '../../domain/dtos/Response'

export interface IDeleteUserUseCase {
  execute(userId: string): Promise<ResponseDTO>
}
