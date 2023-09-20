import { it, describe, expect } from 'vitest'

import { User } from '../../../../src/domain/entities/User'
import { Email } from '../../../../src/domain/valueObjects/Email'

describe('User Class', () => {
  it('should create a user instance with provided data', () => {
    const user = new User({
      name: 'John Doe',
      email: new Email({ address: 'john@example.com' }),
      password: 'password123',
    })
    expect(user.name).toBe('John Doe')
    expect(user.email.address).toBe('john@example.com')
    expect(user.password).toBe('password123')
  })

  it('should create a new user with the create method', () => {
    const user = User.create({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: '654321',
    })

    expect(user.name).toBe('Jane Doe')
    expect(user.email.address).toBe('jane.doe@example.com')
    expect(user.password).toBe('654321')
  })
})
