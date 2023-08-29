import { User } from '../../../src/domain/entities/User'

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

  it('should create a user instance without an ID', () => {
    const user = new User({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'securepass',
      createdAt: new Date(),
    })
    expect(user).toHaveProperty('id')
  })
  it('should create a user instance without a createAt', () => {
    const user = new User({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'securepass',
    })
    expect(user).toHaveProperty('createdAt')
  })
})
