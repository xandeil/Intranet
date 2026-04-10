import React from 'react';

const PageTemplate = ({ title }) => {
    return (
        <div className="p-8 bg-white rounded-lg shadow-sm min-h-[80vh]">
            <header className="border-b border-gray-100 pb-4 mb-6">
                <h1 className="text-2xl font-bold text-blue-900">{title}</h1>
                <p className="text-gray-500 text-sm">JUCEPE - Intranet Governamental</p>
            </header>

            <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-xl">
                <p className="text-gray-400 italic">Conteúdo do módulo {title} em desenvolvimento...</p>
            </div>
        </div>
    );
};

// Exemplo para Cronogramas (faça o mesmo para as outras)
export default function Cronogramas() { return <PageTemplate title="Cronogramas Internos" />; }