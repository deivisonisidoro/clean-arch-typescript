import { Meta, StoryObj } from "@storybook/react";
import Pagination  from ".";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story= {
  args: {
    currentPage: 1,
    totalPages: 4,
  },
  argTypes: {
    onPageChange: { action: 'onPageChange' },
  },
  parameters: {
    actions: {
      argTypesRegex: '^on.*',
    },
  },
}

export const CurrentPageInTheStart: Story= {
  args: {
    currentPage: 1,
    totalPages: 20,
  },
  argTypes: {
    onPageChange: { action: 'onPageChange' },
  },
  parameters: {
    actions: {
      argTypesRegex: '^on.*',
    },
  },
}

export const CurrentPageInTheMiddle: Story= {
  args: {
    currentPage: 10,
    totalPages: 20,
  },
  argTypes: {
    onPageChange: { action: 'onPageChange' },
  },
  parameters: {
    actions: {
      argTypesRegex: '^on.*',
    },
  },
}

export const CurrentPageInTheEnd: Story= {
  args: {
    currentPage: 20,
    totalPages: 20,
  },
  argTypes: {
    onPageChange: { action: 'onPageChange' },
  },
  parameters: {
    actions: {
      argTypesRegex: '^on.*',
    },
  },
}