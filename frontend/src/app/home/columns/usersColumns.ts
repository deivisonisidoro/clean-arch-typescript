import { TableColumn } from "@/components/Table/@types/TableColumn";

export const usersColumns: TableColumn[] = [
  { field: 'id', name: 'ID' },
  { field: 'name', name: 'Full Name' },
  { field: 'email', name: 'Email Address' },
  { field: 'createdAt', name: 'Created At', dateFormat: 'yyyy-MM-dd' },
];