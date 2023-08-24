/**
 * Represents a user in the system.
 */
export class User {
  /**
   * The unique identifier for the user.
   * @type {number|undefined}
   */
  id?: number;

  /**
   * The name of the user.
   * @type {string}
   */
  name: string;

  /**
   * The email address of the user.
   * @type {string}
   */
  email: string;

  /**
   * The password associated with the user.
   * @type {string}
   */
  password: string;

  /**
   * The date when the user was created.
   * @type {Date}
   */
  created_at: Date;

  /**
   * Creates a new User instance.
   * @param {string} name - The name of the user.
   * @param {string} email - The email address of the user.
   * @param {string} password - The password associated with the user.
   * @param {Date} created_at - The date when the user was created.
   * @param {number|undefined} id - The optional unique identifier for the user.
   */
  constructor(name: string, email: string, password: string, created_at: Date, id?: number) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.created_at = created_at;
      this.id = id;
  }
}
