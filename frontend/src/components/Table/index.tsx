import React from 'react';
import { TableProps } from './@types/TableProps';
import { Button } from '../Button';
import Loading from '../Loading';


const Table: React.FC<TableProps> = ({
  data,
  columns,
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}) => {
  return (
    <div>
      <table className="border-collapse w-full text-black">
        <thead>
          <tr className="bg-gray-200 rounded-t">
            {columns.map((column, index) => (
              <th key={index} className="border p-2 rounded-t">
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="text-center text-gray-600 py-4 bg-white">
                <Loading size='md' />
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="border p-2 rounded-md">
                    {row[column.field]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="bg-gray-200 flex items-center justify-end p-2 rounded-b">
        <Button
          title="Previous"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />
        <span className="text-gray-800 mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <Button
          title='Next'
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </div>
    </div>
  );
};

export default Table;