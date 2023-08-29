import { ICreateUserRequestDTO } from '../../dtos/User/CreateUser'
import { User } from '../../entities/User';

export interface ICreateUserUseCase {
  execute(data: ICreateUserRequestDTO): Promise<User | unknown>;
}
