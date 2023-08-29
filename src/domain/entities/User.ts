import { v4 as uuid } from 'uuid'

export class User {
  public readonly id?: string
  public name: string
  public email: string
  public password: string
  public createdAt?: Date

  constructor(props: User) {
    this.name = props.name
    this.email = props.email
    this.password = props.password
    this.createdAt = props.createdAt
    if (!props.createdAt) {
      this.createdAt = new Date()
    } else {
      this.createdAt = props.createdAt
    }

    if (!props.id) {
      this.id = uuid()
    } else {
      this.id = props.id
    }
  }
}
