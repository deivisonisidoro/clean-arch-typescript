import { TextInput } from "@/components/Form/TextInput";
import { FormContainer } from "@/components/Form/FormContainer";
import { Label } from "@/components/Form/Label";
import { PasswordInput } from "@/components/Form/PasswordInput";
import { EmailInput } from "@/components/Form/EmailInput";
import { Button } from "@/components/Form/Button";

export default function RegisterUser() {
  return  (
    <div className="flex items-center justify-center h-screen">
      <FormContainer>
        <div className="mb-4">
          <Label text="Name" nameField="name"/>
          <TextInput name="name" placeholder="Type your name here."/>
        </div>
        <div className="mb-4">
          <Label text="Email" nameField="email"/>
          <EmailInput name="email" placeholder="Type your email here."/>
        </div>
        <div className="mb-6">  
          <Label text="Password" nameField="password"/>
          <PasswordInput name="password" placeholder="Type your password here."/>
        </div>
        <div className="flex items-center justify-center">
          <Button title="Sing Up"/>
        </div>
      </FormContainer>
    </div>
  )
  
}
