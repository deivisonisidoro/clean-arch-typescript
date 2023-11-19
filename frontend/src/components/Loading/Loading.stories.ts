import { Meta, StoryObj } from "@storybook/react";
import Loading  from ".";

const meta ={
  title: "Components/Loading",
  component: Loading,
  tags: ['autodocs'],
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story= {
  args: {
    size: 'md'
  }
}

export const ExtraSmall: Story= {
  args: {
    size: 'xs'
  }
}
export const Small: Story= {
  args: {
    size: 'sm'
  }
}
export const Medium: Story= {
  args: {
    size: 'md'
  }
}
export const Large: Story= {
  args: {
    size: 'lg'
  }
}