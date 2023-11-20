import { it, describe, expect } from 'vitest'

import { User } from '../../../../src/domain/entities/User'
import { Email } from '../../../../src/domain/valueObjects/Email'
import { RefreshToken } from '../../../../src/domain/entities/RefreshToken';

describe('RefreshToken', () => {
  const user = new User({
    name: 'John Doe',
    email: new Email({ address: 'john@example.com' }),
    password: 'password123',
  })

  const refreshTokenProps = {
    expires_in: 3600,
    user_id: 'user123',
    created_at: new Date(),
    user: user,
  };

  const refreshToken = new RefreshToken(refreshTokenProps);

  it('should have correct expires_in', () => {
    expect(refreshToken.expires_in).toBe(3600);
  });

  it('should have correct user_id', () => {
    expect(refreshToken.user_id).toBe('user123');
  });

  it('should have correct user', () => {
    expect(refreshToken.user).toBe(user);
  });

  it('should have correct created_at', () => {
    expect(refreshToken.created_at).toBe(refreshTokenProps.created_at);
  });
});
