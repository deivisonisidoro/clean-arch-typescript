export class User {
  id?: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;

  constructor(name: string, email: string, password: string, created_at: Date, id?: number) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.created_at = created_at;
      this.id = id;
  }
}
