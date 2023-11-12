import { z } from "zod";
import { registerUserFormSchema } from "./schema-validator";

export type RegisterUserFormData = z.infer<typeof registerUserFormSchema> 