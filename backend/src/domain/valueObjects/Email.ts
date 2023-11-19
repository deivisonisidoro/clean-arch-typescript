import { EmailErrorType } from "../enums/email/ErrorType"

type EmailProps = {
  address: string
}
export class Email {
  private _address: string

  get address(): string {
    return this._address
  }

  constructor(props: EmailProps) {
    if (
      props.address == null ||
      !props.address.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      )
    ) {
      throw new Error(EmailErrorType.InvalidEmail)
    }
    this._address = props.address
  }
}
