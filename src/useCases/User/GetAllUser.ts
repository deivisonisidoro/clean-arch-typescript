import { ResponseDTO } from '../../domain/dtos/Response'

export interface IGetAllUserUseCase {
  execute(page: number): Promise<ResponseDTO>
}
