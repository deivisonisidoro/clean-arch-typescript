import { z } from "zod"

const loginFormSchema = z.object({
    email: z.string({
      required_error: "Email is a required field",
      invalid_type_error: "Email must be a string",
    }).min(1, {
      message:"Email is required" 
    }).email({
      message: "Invalid email address"
    }),
    password: z.string({
      required_error: "Password is a required field",
      invalid_type_error: "Password must be a string",
    }).min(1, { message: "Password is required"  }),
});


export { loginFormSchema }