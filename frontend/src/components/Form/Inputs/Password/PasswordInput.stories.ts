import { Meta, StoryObj } from "@storybook/react";
import { PasswordInput } from "./index";

const meta = {
  title: "Components/Form/Inputs/Password",
  component: PasswordInput,
  tags: ['autodocs'],
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story= {
  args: {
    name: 'password',
      placeholder: "Type the password",
    defaultValue: "",
  }
}

export const RequiredPassword: Story= {
  args: {
    name: 'email',
    placeholder: "Type the password",
    defaultValue: "",
    errorMessage: "password is a required field"
  }
}