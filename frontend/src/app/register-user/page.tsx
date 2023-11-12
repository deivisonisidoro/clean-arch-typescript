"use client"
import { Button } from "@/components/Form/Button";
import { FormContainer } from "@/components/Form/FormContainer";
import { Label } from "@/components/Form/Label";
import { EmailInput } from "@/components/Form/Inputs/Email";
import { PasswordInput } from "@/components/Form/Inputs/Password";
import { TextInput } from "@/components/Form/Inputs/Text";
import { SubmitHandler, useForm } from "react-hook-form";
import { createUser } from "../api/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUserFormSchema } from "./schema-validator";
import { RegisterUserFormData } from "./FormValuesInterface";
import { useState } from "react";
import Snackbar from "@/components/Snackbar";
import { SnackbarMessageType } from "@/utils/enums/snackbarMessages";




export default function RegisterUser() {
  const [messageType, setMessageType] = useState<SnackbarMessageType>(
    SnackbarMessageType.Info
  );
  const [message, setMessage] = useState("User registered successfully!")
  const [showMessage, setShowMessage] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserFormData>({
    resolver: zodResolver(registerUserFormSchema),
    mode: "onBlur"
  })

  const onSubmit: SubmitHandler<RegisterUserFormData> = async (data) => {
    setShowMessage(false);
    try {
      await createUser(data);
      setMessageType(SnackbarMessageType.Success);
      setMessage("User registered successfully!");
      setShowMessage(true);
    } catch (error) {
      setMessageType(SnackbarMessageType.Error);
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("An unknown error occurred while registering the user.");
      }
      setShowMessage(true);
    }
  };

  return (
      <>
        {showMessage && <Snackbar message={message} type={messageType}/>}
        <div className="flex items-center justify-center h-screen">
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1">
              <Label text="Name" nameField="name" required/>
              <TextInput defaultValue="" name="name" register={{...register("name")}} errorMessage={errors.name?.message}/>
            </div>
            <div className="flex flex-col gap-1">
              <Label text="E-mail" nameField="email" required/>
              <EmailInput  register={{...register("email")}} name="email" placeholder="Type the e-mail" defaultValue="" errorMessage={errors.email?.message}/>
            </div>
            <div className="flex flex-col gap-1">
              <Label text="Password" nameField="password" required />
              <PasswordInput  register={{...register("password")}} name="password" defaultValue="" errorMessage={errors.password?.message}/>
            </div>
            <div className="flex flex-col gap-1">
              <Label text="Confirm Password" nameField="confirmationPassword" required />
              <PasswordInput  register={{...register("confirmPassword")}} name="confirmPassword" defaultValue="" placeholder="Type the password again" errorMessage={errors.confirmPassword?.message}/>
            </div>
            <div className="flex items-center justify-center">
              <Button title="Sign Up" />
            </div>
          </FormContainer>
        </div>
       
      </>
      

   
  );
}
