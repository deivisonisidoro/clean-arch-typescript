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

export const TableWithTitle: Story = {
  args: {
    title: 'Table with title',
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
export const Loading: Story = {
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
    currentPage: 1,
    totalPages: 1,
    isLoading: true
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

export const ColumnsFormat: Story = {
  args: {
    data: [
      { id: 1, name: 'John Doe', email: 'johndoe@storybook.com', createdAt: new Date(), amount: 25},
      { id: 2, name: 'Jane Smith', email: 'janesmith@storybook.com', createdAt: new Date(), amount: 25.25},
    ],
    columns: [
      [
        { field: 'id', name: 'ID' },
        { field: 'name', name: 'Full Name' },
        { field: 'email', name: 'Email Address' },
        { field: 'createdAt', name: 'Created At', dateFormat: 'yyyy-MM-dd HH:mm:ss' },
        { field: 'amount', name: 'Amount', currencyFormat: 'EUR' },
      ]
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
