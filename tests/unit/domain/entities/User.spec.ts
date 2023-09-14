import { it, describe, expect } from 'vitest'
import { User } from '../../../../src/domain/entities/User'
import { Email } from '../../../../src/domain/entities/Email'

describe('User Class', () => {
  it('should create a user instance with provided data', () => {
    const user = new User({
      name: 'John Doe',
      email: new Email({ address: 'john@example.com' }),
      password: 'password123',
      createdAt: new Date(),
      id: 'uuid',
    })
    expect(user.name).toBe('John Doe')
    expect(user.email.address).toBe('john@example.com')
    expect(user.password).toBe('password123')
    expect(user.createdAt).toBeInstanceOf(Date)
    expect(user.id).toBe('uuid')
  })

  it('should update the name, email and password of the user', () => {
    const user = new User({
      name: 'John Doe',
      email: new Email({ address: 'john@example.com' }),
      password: 'password123',
      createdAt: new Date(),
      id: 'uuid',
    })
    user.name = 'New Name'
    user.email = new Email({ address: 'new@example.com' })
    user.password = 'newpass'

    expect(user.name).toBe('New Name')
    expect(user.email.address).toBe('new@example.com')
    expect(user.password).toBe('newpass')
  })

  it("should create a new user with the create method", () => {
    const user = User.create({
      name: "Jane Doe",
      email: "jane.doe@example.com",
      password: "654321",
    });

    expect(user.id).toBe("");
    expect(user.name).toBe("Jane Doe");
    expect(user.email.address).toBe("jane.doe@example.com");
    expect(user.password).toBe("654321");
    expect(user.createdAt).toBeInstanceOf(Date);
  });
})
