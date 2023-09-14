export class Email {
  address: string

  constructor(address: string) {
    if (
      address == null ||
      !address.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      )
    ) {
      throw new Error('Invalid Email Address')
    }
    this.address = address
  }
}
