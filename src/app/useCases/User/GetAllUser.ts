import { ResponseDTO } from '../../dtos/Response'

export interface IGetAllUserUseCase {
  execute(page: number): Promise<ResponseDTO>
}
