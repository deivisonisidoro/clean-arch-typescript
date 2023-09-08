import { it, describe, expect } from 'vitest'
import { User } from '../../../../src/domain/entities/User'

describe('User Class', () => {
  it('should create a user instance with provided data', () => {
    const user = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      createdAt: new Date(),
      id: 'uuid',
    })
    expect(user.name).toBe('John Doe')
    expect(user.email).toBe('john@example.com')
    expect(user.password).toBe('password123')
    expect(user.createdAt).toBeInstanceOf(Date)
    expect(user.id).toBe('uuid')
  })

  it('should update the name, email and password of the user', () => {
    const user = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      createdAt: new Date(),
      id: 'uuid',
    })
    user.name = 'New Name'
    user.email = 'new@example.com'
    user.password = 'newpass'
    expect(user.name).toBe('New Name')
    expect(user.email).toBe('new@example.com')
    expect(user.password).toBe('newpass')
  })
})
