import { IUsersRepository } from "../../../repositories/User";
import { IAuthenticateUserDTO } from "../../../../domain/dtos/User/Authenticate";
import { IPasswordHasher } from "../../../providers/PasswordHasher";
import { IRefreshTokenProvider } from "../../../providers/RefreshTokenProvider";
import { IUserInRequestDTO } from "../../../../domain/dtos/User/UserIn";
import { IAuthenticateUserUserUseCase } from "../AuthenticateUser";
import { AuthenticateUserErrorType } from "../../../../domain/enums/Authticate/AuthenticateUser/ErrorType";



export class AuthenticateUserUseCase implements IAuthenticateUserUserUseCase{
  constructor(
    private userRepository: IUsersRepository,
    private passwordHasher : IPasswordHasher,
    private generateRefreshTokenProvider: IRefreshTokenProvider,
  ){}
  async execute({email, password}: IAuthenticateUserDTO){
    const userAlreadyExists = await this.userRepository.findByEmail(email) as IUserInRequestDTO | null;

    if(!userAlreadyExists){
      return { data: { error: AuthenticateUserErrorType.EmailOrPasswordWrong }, success: false }
    }

    const passwordMatch = await this.passwordHasher.comparePasswords(password, userAlreadyExists.password);

    if(!passwordMatch){
      return { data: { error: AuthenticateUserErrorType.EmailOrPasswordWrong }, success: false }
    }
    await this.generateRefreshTokenProvider.delete(userAlreadyExists.id)
    const token = await this.generateRefreshTokenProvider.generateToken(userAlreadyExists.id);

    const refreshToken = await this.generateRefreshTokenProvider.create(userAlreadyExists.id)

    await this.generateRefreshTokenProvider.save(refreshToken);

    return  { data: {token, refreshToken}, success: true }
  }
}
