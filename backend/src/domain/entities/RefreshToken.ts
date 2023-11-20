import { User } from "./User";

interface IRefreshToken {
  expires_in: number;
  user_id: string;
  user: User;
  created_at: Date;
}
export class RefreshToken{
  private _expires_in: number;
  private _user_id: string;
  private _user: User;
  private _created_at: Date;

  get expires_in(): number{
    return this._expires_in
  }
  get user_id(): string{
    return this._user_id
  }
  get user(): User{
    return this._user
  }
  get created_at(): Date{
    return this._created_at
  }

  constructor(props: IRefreshToken){
    this._expires_in = props.expires_in
    this._user_id = props.user_id
    this._created_at = props.created_at
    this._user = props.user
  }

}
