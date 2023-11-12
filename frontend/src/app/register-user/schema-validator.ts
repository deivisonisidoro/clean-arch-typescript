import { z } from "zod"

const registerUserFormSchema = z.object({
    name: z.string({
      required_error: "Name is a required field",
      invalid_type_error: "Name must be a string",
    }).min(3, {
      message: "Must be 3 or more characters long" 
    }).transform(name => {
      return name.trim().split(" ").map( word =>{
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      }).join(" ")
    }),
    email: z.string({
      required_error: "Email is a required field",
      invalid_type_error: "Name must be a string",
    }).email({
      message: "Invalid email address"
    }).toLowerCase().endsWith(".com", { message: "Only .com domains allowed" }),
    password: z.string({
      required_error: "Name is a required field",
      invalid_type_error: "Name must be a string",
    }).min(6, { message: "Must be 6 or more characters long" })
})

export { registerUserFormSchema }