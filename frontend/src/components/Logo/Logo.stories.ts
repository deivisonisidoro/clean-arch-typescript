import { Meta, StoryObj } from "@storybook/react";
import Logo  from ".";

const meta ={
  title: "Components/Logo",
  component: Logo,
  tags: ['autodocs'],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story= {
  args: {
   height: 150,
   width: 150,
  }
}