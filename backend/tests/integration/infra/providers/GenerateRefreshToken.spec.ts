import { test, describe, expect, beforeEach } from 'vitest';
import { IGenerateRefreshTokenProvider } from '../../../../src/app/providers/GenerateRefreshToken'
import { GenerateRefreshTokenProvider } from '../../../../src/infra/providers/GenerateRefreshToken';


describe('GenerateRefreshTokenProvider', () => {
  let generateRefreshTokenProvider: IGenerateRefreshTokenProvider

  beforeEach(() => {
    generateRefreshTokenProvider = new GenerateRefreshTokenProvider();
  });

  test('generateToken should return a string', async () => {
    const token = 'yourToken';

    const generatedToken = await generateRefreshTokenProvider.generateToken(token);
    expect(generatedToken).toBeTypeOf('string')

  });

});
