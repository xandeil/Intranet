import React from 'react';

const Table = ({ columns, data, className = "" }) => {
  return (
    <div className={`w-full overflow-hidden rounded-2xl border border-jucepe-light bg-white ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-jucepe-dark text-white uppercase text-xs">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="px-6 py-4 font-bold tracking-wider whitespace-nowrap">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-jucepe-light">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-jucepe-light/30 transition-colors">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 text-jucepe-dark/80 whitespace-nowrap">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;