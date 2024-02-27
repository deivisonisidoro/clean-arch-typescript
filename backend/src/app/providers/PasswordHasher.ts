/**
 * Interface for the provider responsible for hashing and comparing passwords.
 *
 * @interface
 */
export interface IPasswordHasher {
  /**
   * Hashes the provided password.
   *
   * @async
   * @param {string} password - The password to be hashed.
   * @returns {Promise<string>} The hashed password.
   */
  hashPassword(password: string): Promise<string>

  /**
   * Compares the provided password with a hashed password.
   *
   * @async
   * @param {string} password - The password to be compared.
   * @param {string} hashedPassword - The hashed password for comparison.
   * @returns {Promise<boolean>} A boolean indicating whether the passwords match.
   */
  comparePasswords(password: string, hashedPassword: string): Promise<boolean>
}
