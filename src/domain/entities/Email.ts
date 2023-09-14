type EmailProps = {
  address: string
}
export class Email {
  private _address: string

  get address(): string {
    return this._address
  }
  set address(newAddress: string) {
    this._address= newAddress
  }
  constructor(props: EmailProps) {
    if (
      props.address == null ||
      !props.address.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      )
    ) {
      throw new Error('Invalid Email Address')
    }
    this._address = props.address
  }
}
