import { IAuthenticateUserDTO } from '../../../../domain/dtos/Authenticate/AuthenticateUser'
import { ResponseDTO } from '../../../../domain/dtos/Response'
import { IUserInRequestDTO } from '../../../../domain/dtos/User/UserIn'
import { AuthenticateUserErrorType } from '../../../../domain/enums/Authenticate/AuthenticateUser/ErrorType'
import { IGenerateRefreshTokenProvider } from '../../../providers/GenerateRefreshToken'
import { IPasswordHasher } from '../../../providers/PasswordHasher'
import { IRefreshTokenRepository } from '../../../repositories/RefreshToken'
import { IUsersRepository } from '../../../repositories/User'
import { IAuthenticateUserUserUseCase } from '../AuthenticateUser'

/**
 * Use case for authenticating a user.
 *
 * @class
 * @implements {IAuthenticateUserUserUseCase}
 */
export class AuthenticateUserUseCase implements IAuthenticateUserUserUseCase {
  /**
   * Creates an instance of AuthenticateUserUseCase.
   *
   * @constructor
   * @param {IUsersRepository} userRepository - The repository for user data.
   * @param {IPasswordHasher} passwordHasher - The password hasher provider.
   * @param {IGenerateRefreshTokenProvider} generateRefreshTokenProvider - The refresh token generator provider.
   * @param {IRefreshTokenRepository} refreshTokenRepository - The repository for refresh tokens.
   */
  constructor(
    private userRepository: IUsersRepository,
    private passwordHasher: IPasswordHasher,
    private generateRefreshTokenProvider: IGenerateRefreshTokenProvider,
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  /**
   * Executes the authenticate user use case.
   *
   * @async
   * @param {IAuthenticateUserDTO} credentials - The user credentials for authentication.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<ResponseDTO> {
    try {
      const user = (await this.userRepository.findByEmail(
        email,
      )) as IUserInRequestDTO | null

      if (!user) {
        return {
          data: { error: AuthenticateUserErrorType.EmailOrPasswordWrong },
          success: false,
        }
      }

      const passwordMatch = await this.passwordHasher.comparePasswords(
        password,
        user.password,
      )

      if (!passwordMatch) {
        return {
          data: { error: AuthenticateUserErrorType.EmailOrPasswordWrong },
          success: false,
        }
      }

      const token = await this.generateRefreshTokenProvider.generateToken(
        user.id,
      )
      const refreshTokenFounded =
        await this.refreshTokenRepository.findByUserId(user.id)

      if (refreshTokenFounded) {
        await this.refreshTokenRepository.delete(user.id)
      }

      const refreshToken = await this.refreshTokenRepository.create(user.id)

      return { data: { token, refreshToken, user }, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
