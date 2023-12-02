import { z } from "zod";
import { loginFormSchema } from "./schema-validator";

export type LoginFormData = z.infer<typeof loginFormSchema> 