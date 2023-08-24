export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public createdAt?: Date,
    public id?: number,
  ) {}
}
