import { User } from "./User";

export interface IRefreshToken {
  expires_in: number;
  user_id: string;
  user: User;
  createdAt: Date;
}
export class RefreshToken{
  private _expires_in: number;
  private _user_id: string;
  private _user: User;
  private _createdAt: Date;

  get expires_in(): number{
    return this._expires_in
  }
  get user_id(): string{
    return this._user_id
  }
  get user(): User{
    return this._user
  }
  get createdAt(): Date{
    return this._createdAt
  }

  constructor(props: IRefreshToken){
    this._expires_in = props.expires_in
    this._user_id = props.user_id
    this._createdAt = props.createdAt
    this._user = props.user
  }

}
