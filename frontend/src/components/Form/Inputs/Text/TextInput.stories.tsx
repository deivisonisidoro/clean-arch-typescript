import { Meta, StoryObj } from "@storybook/react";
import { TextInput } from "./index";

const meta = {
  title: "Components/Form/Inputs/Text",
  component: TextInput,
  tags: ['autodocs'],
}  satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story= {
  args: {
    name: 'name',
    placeholder: "Type the name",
    defaultValue: "",
  }
}

export const RequiredName: Story= {
  args: {
    name: 'email',
    placeholder: "Type the name",
    defaultValue: "",
    errorMessage: "name is a required field"
  }
}