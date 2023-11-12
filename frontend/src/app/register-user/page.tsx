"use client"
import { Button } from "@/components/Form/Button";
import { FormContainer } from "@/components/Form/FormContainer";
import { Label } from "@/components/Form/Label";
import { EmailInput } from "@/components/Form/Inputs/Email";
import { PasswordInput } from "@/components/Form/Inputs/Password";
import { TextInput } from "@/components/Form/Inputs/Text";
import { FormProvider, useForm } from "react-hook-form";
import { createUser } from "../api/users";
import { FormValuesInterface } from "./FormValuesInterface";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema-validator";

export default function RegisterUser() {
  const methods = useForm<FormValuesInterface>({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
    resolver: yupResolver(schema),
    mode: "onChange"
  });

  const onSubmit = async (data: FormValuesInterface) => {
    try {
      const responseData = await createUser(data);
      console.log('User created successfully:', responseData);
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <FormProvider {...methods}>
       <FormContainer onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <Label text="Name" nameField="name" />
            <TextInput name="name"/>
          </div>
          <div className="flex flex-col gap-1">
            <Label text="E-mail" nameField="email" />
            <EmailInput name="email" placeholder="Type the e-mail"/>
          </div>
          <div className="flex flex-col gap-1">
            <Label text="Password" nameField="password" />
            <PasswordInput name="password" />
          </div>
          <div className="flex items-center justify-center">
            <Button title="Sign Up" />
          </div>
        </FormContainer>
    </FormProvider>
   
  );
}
