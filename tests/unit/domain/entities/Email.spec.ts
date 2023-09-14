import { describe, expect, it } from 'vitest'
import { Email } from '../../../../src/domain/entities/Email'

describe('EmailClass', () => {
  it('should create a email instance with provided email', () => {
    const email = new Email({ address: 'test@example.com' })
    expect(email.address).toBe('test@example.com')
  })

  it('should not create a email instance with provided email', () => {
    expect(() => new Email({ address: 'invalid' })).toThrow(
      'Invalid Email Address',
    )
  })

})
