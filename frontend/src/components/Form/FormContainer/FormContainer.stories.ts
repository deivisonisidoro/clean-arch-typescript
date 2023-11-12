import { Meta, StoryObj } from "@storybook/react";
import { FormContainer } from ".";

const meta = {
  title: "Components/Form/FormContainer",
  component: FormContainer,
  tags: ['autodocs'],
} satisfies Meta<typeof FormContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story= {
  args: {
    children: 'Test',
    onSubmit: () => {}
  }
}