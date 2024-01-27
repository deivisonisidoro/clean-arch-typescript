import { Meta, StoryObj } from '@storybook/react';
import Table from '.';

const meta: Meta = {
  title: 'Components/Table',
  component: Table,
  args: {
    currentPage: 1,
    totalPages: 1,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      { id: 1, name: 'John Doe', age: 25 },
      { id: 2, name: 'Jane Smith', age: 30 },
    ],
    columns: [
      { field: 'id', name: 'ID' },
      { field: 'name', name: 'Full Name' },
      { field: 'age', name: 'Age' },
    ],
  },
  argTypes: {
    onPageChange: { action: 'onPageChange' },
  },
  parameters: {
    actions: {
      argTypesRegex: '^on.*',
    },
  },
};

export const Paginated: Story = {
  args: {
    data: [], // Provide paginated data from the backend
    columns: [
      { field: 'id', name: 'ID' },
      { field: 'name', name: 'Full Name' },
      { field: 'age', name: 'Age' },
    ],
    currentPage: 1,
    totalPages: 1,
  },
  argTypes: {
    onPageChange: { action: 'onPageChange' },
  },
  parameters: {
    actions: {
      argTypesRegex: '^on.*',
    },
  },
};
