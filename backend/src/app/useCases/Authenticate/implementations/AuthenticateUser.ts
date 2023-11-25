import { IUsersRepository } from "../../../repositories/User";
import { IRefreshTokenRepository } from "../../../repositories/RefreshToken"
import { IAuthenticateUserDTO } from "../../../../domain/dtos/User/Authenticate";
import { IPasswordHasher } from "../../../providers/PasswordHasher";
import { IGenerateRefreshTokenProvider } from "../../../providers/GenerateRefreshToken";
import { IUserInRequestDTO } from "../../../../domain/dtos/User/UserIn";
import { IAuthenticateUserUserUseCase } from "../AuthenticateUser";
import { AuthenticateUserErrorType } from "../../../../domain/enums/Authenticate/AuthenticateUser/ErrorType";



export class AuthenticateUserUseCase implements IAuthenticateUserUserUseCase{
  constructor(
    private userRepository: IUsersRepository,
    private passwordHasher : IPasswordHasher,
    private generateRefreshTokenProvider: IGenerateRefreshTokenProvider,
    private refreshTokenRepository: IRefreshTokenRepository
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

    const token = await this.generateRefreshTokenProvider.generateToken(userAlreadyExists.id);

    const refreshToken = await this.refreshTokenRepository.create(userAlreadyExists.id)

    return  { data: {token, refreshToken}, success: true }
  }
}
