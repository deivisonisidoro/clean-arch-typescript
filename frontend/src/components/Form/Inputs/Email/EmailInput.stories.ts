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
    placeholder: "Test placeholder"
  }
}