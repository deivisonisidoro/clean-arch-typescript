import { beforeEach, describe, expect, it } from 'vitest'

import { IPasswordHasher } from '../../../../src/app/providers/PasswordHasher'
import { PasswordHasher } from '../../../../src/infra/providers/PasswordHasher';

describe('PasswordHasher', () => {
  let passwordHasher: IPasswordHasher;

  beforeEach(() => {
    passwordHasher = new PasswordHasher();
  });

  it('should hash the password', async () => {
    const originalPassword = 'mySecurePassword123';

    const hashedPassword = await passwordHasher.hashPassword(originalPassword);

    expect(typeof hashedPassword).toBe('string');
  });

  it('should compare passwords and return true for correct password', async () => {
    const originalPassword = 'mySecurePassword123';

    const hashedPassword = await passwordHasher.hashPassword(originalPassword);

    const passwordMatch = await passwordHasher.comparePasswords(originalPassword, hashedPassword);

    expect(passwordMatch).toBe(true);
  });

  it('should compare passwords and return false for incorrect password', async () => {
    const originalPassword = 'mySecurePassword123';
    const incorrectPassword = 'wrongPassword';

    const hashedPassword = await passwordHasher.hashPassword(originalPassword);

    const passwordMatch = await passwordHasher.comparePasswords(incorrectPassword, hashedPassword);

    expect(passwordMatch).toBe(false);
  });
});
