import { describe, expect, it } from 'vitest'
import { Email } from '../../../../src/domain/valueObjects/Email'

describe('EmailClass', () => {
  it('should create a email instance with provided email', () => {
    const email = new Email('test@example.com')
    expect(email.address).toBe('test@example.com')
  })
  it('should not create a email instance with provided email', () => {
    expect(() => new Email('invalid')).toThrow('Invalid Email Address')
  })
})
