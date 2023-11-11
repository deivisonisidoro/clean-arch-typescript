import { TextInput } from "@/components/Form/TextInput";
import { FormContainer } from "@/components/Form/FormContainer";
import { Label } from "@/components/Form/Label";
import { PasswordInput } from "@/components/Form/PasswordInput";
import { EmailInput } from "@/components/Form/EmailInput";
import { Button } from "@/components/Form/Button";

export default function RegisterUser() {
  return  (
      <FormContainer>
        <div className="flex flex-col gap-1">
          <Label text="Name" nameField="name"/>
          <TextInput name="name" placeholder="Type your name here."/>
        </div>
        <div className="flex flex-col gap-1">
          <Label text="E-mail" nameField="email"/>
          <EmailInput name="email" placeholder="Type your email here."/>
        </div>
        <div className="flex flex-col gap-1">  
          <Label text="Password" nameField="password"/>
          <PasswordInput name="password" placeholder="Type your password here."/>
        </div>
        <div className="flex items-center justify-center">
          <Button title="Sing Up"/>
        </div>
      </FormContainer>

  )
  
}
