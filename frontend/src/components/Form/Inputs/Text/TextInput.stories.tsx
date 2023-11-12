import { Meta, StoryObj } from "@storybook/react";
import { TextInput } from "./index";

const meta = {
  title: "Components/Form/Inputs/Text",
  component: TextInput
}  satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story= {
  args: {
    name: 'Test',
    placeholder: "Test placeholder"
  }
}