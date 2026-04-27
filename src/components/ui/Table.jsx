import React from 'react';

const Table = ({ columns, data, className = "" }) => {
  return (
    /* overflow-x-auto permite scroll no celular | overflow-hidden mantém as bordas arredondadas nos cantos */
    <div className={`w-full overflow-x-auto rounded-jucepe border border-jucepe-light overflow-hidden ${className}`}>
      <table className="w-full text-sm text-left border-collapse">
        {/* Cabeçalho com o azul escuro da JUCEPE */}
        <thead className="bg-jucepe-dark text-white uppercase text-xs">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-6 py-4 font-semibold tracking-wider whitespace-nowrap">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Corpo da tabela com linhas intercaladas (zebra) */}
        <tbody className="bg-white divide-y divide-jucepe-light">
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              className="hover:bg-jucepe-light/30 transition-colors"
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-6 py-4 text-jucepe-dark/80 whitespace-nowrap">
                  {/* Se houver uma função de renderização específica para a coluna, usa ela */}
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;