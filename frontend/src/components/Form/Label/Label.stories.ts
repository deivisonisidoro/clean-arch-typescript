import { Meta, StoryObj } from "@storybook/react";
import { Label } from "./index";

const meta = {
  title: "Components/Form/Label",
  component: Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story= {
  args: {
    text: "Name",
    nameField: "name",
    required: false,
  }
}

export const Required: Story= {
  args: {
    text: "Name",
    nameField: "name",
    required: true,
  }
}