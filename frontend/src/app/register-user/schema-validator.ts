import * as yup from "yup"

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required()
  })
  .required()

export { schema }