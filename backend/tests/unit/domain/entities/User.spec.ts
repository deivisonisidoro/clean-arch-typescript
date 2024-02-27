/**
 * Unit tests for the User class using Vitest.
 * @module UserClassTests
 */

import { it, describe, expect } from 'vitest'

import { User } from '../../../../src/domain/entities/User'
import { Email } from '../../../../src/domain/valueObjects/Email'

/**
 * Test suite for the User class.
 * @function
 * @name UserClassTests
 */
describe('User Class', () => {
  /**
   * Test case to verify that it creates a user instance with provided data.
   * @function
   * @name shouldCreateUserInstance
   */
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

  /**
   * Test case to verify that it creates a new user with the create method.
   * @function
   * @name shouldCreateNewUserWithCreateMethod
   */
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
