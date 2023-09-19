import { ResponseDTO } from '../../applications/dtos/Response'

export interface IGetAllUserUseCase {
  execute(page: number): Promise<ResponseDTO>
}
