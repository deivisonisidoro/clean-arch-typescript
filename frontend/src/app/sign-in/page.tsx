"use client"
import { FormContainer } from '@/components/Form/FormContainer';
import { EmailInput } from '@/components/Form/Inputs/Email';
import { PasswordInput } from '@/components/Form/Inputs/Password';
import { Label } from '@/components/Form/Label';
import Logo from '@/components/Logo';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginFormSchema } from './schema-validator';
import { LoginFormData } from './FormValuesInterface';
import { Button } from '@/components/Form/Button';
import { AuthContext } from '@/contexts/AuthContext';
import { SnackbarMessageType } from '@/enums/snackbarMessages';
import Loading from '@/components/Loading';
import Snackbar from '@/components/Snackbar';
import LinkComponent from '@/components/Link';
import { useRouter } from 'next/navigation';



const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState<SnackbarMessageType>(
    SnackbarMessageType.Info
  );
  const [message, setMessage] = useState("User registered successfully!")
  const [showMessage, setShowMessage] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: "onBlur"
  })
  const router = useRouter()
  const { signIn } = useContext(AuthContext)

  const onSubmit: SubmitHandler<LoginFormData> = async (data ) =>{
    setShowMessage(false);
    try {
      setLoading(true);
      await signIn(data)
      setMessageType(SnackbarMessageType.Success);
      setMessage("User signed in successfully");
      setShowMessage(true);
      router.push('/home')
    } catch (error) {
      setMessageType(SnackbarMessageType.Error);
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("An unknown error occurred while registering the user.");
      }
      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <>
      {showMessage && <Snackbar message={message} type={messageType}/>}
      <div className="flex items-center justify-center h-screen flex-col">
        {loading && <Loading size="lg" />}
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
          <div className="flex flex-row items-center  justify-end">
            <LinkComponent  label='Sign Up' route='/sign-up'/>
          </div>
          <div className="flex items-center justify-center">
            <Button title="Sign In" />
          </div>
        </FormContainer>
      </div>
    </>
  );
}

export default Login;