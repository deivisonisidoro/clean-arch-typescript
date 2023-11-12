import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./index";

const meta ={
  title: "Components/Form/Button",
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