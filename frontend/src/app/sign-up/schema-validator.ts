import { z } from "zod"

const registerUserFormSchema = z.object({
    name: z.string({
      required_error: "Name is a required field",
      invalid_type_error: "Name must be a string",
    }).min(1, {
      message:"Name is required" 
    }).transform(name => {
      return name.trim().split(" ").map( word =>{
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      }).join(" ")
    }),
    email: z.string({
      required_error: "Email is a required field",
      invalid_type_error: "Name must be a string",
    }).min(1, {
      message:"Email is required" 
    }).email({
      message: "Invalid email address"
    }).toLowerCase().endsWith(".com", { message: "Only .com domains allowed" }),
    password: z.string({
      required_error: "Password is a required field",
      invalid_type_error: "Password must be a string",
    }).min(6, { message: "Must be 6 or more characters long" }),
    confirmPassword: z.string({
      required_error: "Confirm Password is a required field",
      invalid_type_error: "Password must be a string",
    }).min(6, { message: "Must be 6 or more characters long" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "The passwords did not match",
  path: ["confirmPassword"],
});


export { registerUserFormSchema }