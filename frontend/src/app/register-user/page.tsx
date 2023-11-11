"use client"
import { Button } from "@/components/Form/Button";
import { EmailInput } from "@/components/Form/EmailInput";
import { FormContainer } from "@/components/Form/FormContainer";
import { Label } from "@/components/Form/Label";
import { PasswordInput } from "@/components/Form/PasswordInput";
import { TextInput } from "@/components/Form/TextInput";
import { useForm } from "react-hook-form";
import { createUser } from "../api/users";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterUser() {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
    mode: "onChange"
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const responseData = await createUser(data);
      console.log('User created successfully:', responseData);
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <Label text="Name" nameField="name" />
        <TextInput name="name" rules={{ required: true }} control={control} />
      </div>
      <div className="flex flex-col gap-1">
        <Label text="E-mail" nameField="email" />
        <EmailInput name="email" rules={{ required: true }} control={control} />
      </div>
      <div className="flex flex-col gap-1">
        <Label text="Password" nameField="password" />
        <PasswordInput name="password" rules={{ required: true }} control={control} />
      </div>
      <div className="flex items-center justify-center">
        <Button title="Sign Up" />
      </div>
    </FormContainer>
  );
}
