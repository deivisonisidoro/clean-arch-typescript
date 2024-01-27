import { Meta, StoryObj } from "@storybook/react";
import LinkComponent  from ".";

const meta = {
  title: "Components/Link",
  component: LinkComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof LinkComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story= {
  args: {
    label: "Click here",
    route: '#'
  }
}

export const LinkBlue: Story= {
  args: {
    label: "Click here",
    route: '#',
    color: "blue"
  }
}