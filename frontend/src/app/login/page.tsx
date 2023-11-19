"use client"
import { FormContainer } from '@/components/Form/FormContainer';
import { EmailInput } from '@/components/Form/Inputs/Email';
import { PasswordInput } from '@/components/Form/Inputs/Password';
import { Label } from '@/components/Form/Label';
import Logo from '@/components/Logo';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginFormSchema } from './schema-validator';
import { LoginFormData } from './FormValuesInterface';
import { Button } from '@/components/Form/Button';



const Login: React.FC = () => {
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: "onBlur"
  })

  const onSubmit: SubmitHandler<LoginFormData>   = async (data ) => console.log(data);
  
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div className="flex items-center justify-center mb-6 mt-2">
        <Logo />
      </div>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <Label text="E-mail" nameField="email" required/>
          <EmailInput  register={{...register("email")}} name="email" placeholder="Type the e-mail" defaultValue="" errorMessage={errors.email?.message}/>
        </div>
        <div className="flex flex-col gap-1">
          <Label text="Password" nameField="password" required />
          <PasswordInput  register={{...register("password")}} name="password" defaultValue="" errorMessage={errors.password?.message}/>
        </div>
        <div className="flex items-center justify-center">
              <Button title="Sign In" />
        </div>
      </FormContainer>
    </div>
  );
}

export default Login;