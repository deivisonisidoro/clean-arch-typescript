import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest';

import { IAuthenticateUserDTO } from "../../../../src/domain/dtos/User/Authenticate";
import { IUsersRepository } from "../../../../src/app/repositories/User";
import { IRefreshTokenProvider } from "../../../../src/app/providers/RefreshTokenProvider";
import { AuthenticateUserUseCase } from "../../../../src/app/useCases/Authenticate/implementations/AuthenticateUser"
import { IPasswordHasher } from "../../../../src/app/providers/PasswordHasher";
import { AuthenticateUserErrorType } from '../../../../src/domain/enums/Authticate/AuthenticateUser/ErrorType';



describe("Authenticate user", ()=>{
  let userRepository: IUsersRepository;
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let generateRefreshTokenProvider: IRefreshTokenProvider;
  let passwordHasher: IPasswordHasher;

  beforeEach(() => {
    userRepository = {
      update: vi.fn(),
      findByEmail: vi.fn(),
      create: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      delete: vi.fn(),
    }
    passwordHasher = {
      hashPassword: vi.fn(),
      comparePasswords: vi.fn()
    }
    generateRefreshTokenProvider = {
      create: vi.fn(),
      findId: vi.fn(),
      delete: vi.fn(),
      save: vi.fn(),
      generateToken: vi.fn()
    }
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepository, passwordHasher, generateRefreshTokenProvider )
  })
  afterEach(() => {
    vi.clearAllMocks()
  })



  it("should be able to authenticate an user", async ()=>{
    const userData : IAuthenticateUserDTO = {
      email: "test@test.com.br",
      password: "123456"
    };

    userRepository.findByEmail = vi.fn().mockResolvedValueOnce(userData);
    passwordHasher.comparePasswords = vi.fn().mockResolvedValueOnce(true);
    generateRefreshTokenProvider.delete = vi.fn().mockResolvedValueOnce(null)
    const userAuthenticated = await authenticateUserUseCase.execute(userData);

    expect(userAuthenticated.data).toHaveProperty("token");
    expect(userAuthenticated.data).toHaveProperty("refreshToken");
  });

  it("should not be able to authenticate an existing user with wrong email", async () => {
    const userData: IAuthenticateUserDTO = {
      email: "testexisting@test.com.br",
      password: "testexisting",
    };
    userRepository.findByEmail = vi.fn().mockResolvedValueOnce(null);

    const result = await authenticateUserUseCase.execute(userData)
    expect(result.data).toEqual({ error: AuthenticateUserErrorType.EmailOrPasswordWrong })
  });

  it("should not be able to authenticate an existing user with wrong password", async () => {
    const userData: IAuthenticateUserDTO = {
      email: "testexisting@test.com.br",
      password: "testexisting",
    };
    userRepository.findByEmail = vi.fn().mockResolvedValueOnce(userData);
    passwordHasher.comparePasswords = vi.fn().mockResolvedValueOnce(false);

    const result = await authenticateUserUseCase.execute(userData)
    expect(result.data).toEqual({ error: AuthenticateUserErrorType.EmailOrPasswordWrong })
  });
})
