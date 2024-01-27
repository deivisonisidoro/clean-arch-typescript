import { Meta, StoryObj } from "@storybook/react";
import { Button } from ".";

const meta ={
  title: "Components/Button",
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story= {
  args: {
    title: 'Test',
  }
}