import { IUpdateUserRequestDTO } from '../../dtos/User/UpdateUser'
import { User } from '../../entities/User'

export interface IUpdateUserUseCase {
  execute({ id, name, email, password }: IUpdateUserRequestDTO): Promise<User>
}
