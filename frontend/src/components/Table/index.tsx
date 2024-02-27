import React from 'react';
import { TableProps } from './@types/TableProps';
import { TableColumn } from './@types/TableColumn';
import Loading from '../Loading';
import Pagination from '../Pagination';
import { format } from 'date-fns';

const Table: React.FC<TableProps> = ({
  data,
  columns,
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
  title,
}) => {
  return (
    <div>
      <table className="border-collapse w-full text-black">
        <thead className=' rounded-t'>
          {title && (
            <tr className="bg-gray-800 text-white text-left">
              <th colSpan={columns.length} className="border p-2 py-4">
                {title}
              </th>
            </tr>
          )}
          <tr className="bg-gray-600 ">
            {columns.map((column, index) => (
              <th key={index} className="border p-2 text-white">
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4 bg-white">
                <Loading size='lg' />
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? 'bg-gray-300' : 'bg-white'} text-center`}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="border p-4 rounded-md">
                    {renderCellContent(row, column)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="bg-gray-800 flex items-center justify-end p-2 rounded-b">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </div>
    </div>
  );
};

export default Table;

function renderCellContent(row: Record<string, any>, column: TableColumn): React.ReactNode {
  if (column.dateFormat) {
    return formatDate(row[column.field], column.dateFormat);
  }

  if (column.currencyFormat) {
    return formatCurrency(row[column.field], column.currencyFormat);
  }

  return row[column.field];
}

function formatDate(dateString: string, dateFormat: string): string {
  const date = new Date(dateString);
  return format(date, dateFormat);
}

function formatCurrency(amount: number, currencyFormat: string): string {
  const options = { style: 'currency', currency: currencyFormat };
  return new Intl.NumberFormat(undefined, options).format(amount);
}
