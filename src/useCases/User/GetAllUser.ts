import { ResponseDTO } from '../../application/dtos/Response'

export interface IGetAllUserUseCase {
  execute(page: number): Promise<ResponseDTO>
}
