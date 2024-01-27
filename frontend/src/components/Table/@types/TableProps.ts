import { TableColumn } from "./TableColumn";

export type TableProps = {
  data: Record<string, any>[];
  columns: TableColumn[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}
