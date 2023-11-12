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
    name: 'Test',
    placeholder: "Test placeholder"
  }
}