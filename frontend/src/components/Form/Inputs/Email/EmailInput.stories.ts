import type { Meta, StoryObj } from '@storybook/react';
import { EmailInput } from "./index";

const meta = {
  title: "Components/Form/Inputs/Email",
  component: EmailInput,
  tags: ['autodocs'],
} satisfies Meta<typeof EmailInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story= {
  args: {
    name: 'Test',
    placeholder: "Type the E-mail",
    defaultValue: "",
  }
}

export const InvalidEmail: Story= {
  args: {
    name: 'email',
    placeholder: "Type the E-mail",
    defaultValue: "testingValidationError",
    errorMessage: "email must be a valid email"
  }
}
export const RequiredEmail: Story= {
  args: {
    name: 'email',
    placeholder: "Type the e-mail",
    defaultValue: "",
    errorMessage: "email is a required field"
  }
}