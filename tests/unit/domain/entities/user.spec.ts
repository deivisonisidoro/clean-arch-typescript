import { User } from '../../../../src/domain/entities/User'

describe('User Class', () => {
  it('should create a user instance with provided data', () => {
    const user = new User(
      'John Doe',
      'john@example.com',
      'password123',
      new Date(),
      1,
    )
    expect(user.name).toBe('John Doe')
    expect(user.email).toBe('john@example.com')
    expect(user.password).toBe('password123')
    expect(user.createdAt).toBeInstanceOf(Date)
    expect(user.id).toBe(1)
  })

  it('should create a user instance without an ID', () => {
    const user = new User(
      'Jane Doe',
      'jane@example.com',
      'securepass',
      new Date(),
    )
    expect(user.id).toBeUndefined()
  })
  it('should create a user instance without a createAt', () => {
    const user = new User('Jane Doe', 'jane@example.com', 'securepass')
    expect(user.createdAt).toBeUndefined()
  })
})
