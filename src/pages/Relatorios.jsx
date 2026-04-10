import React from 'react';

export default function Relatorios() {
    const relatorios = [
        { id: 1, nome: "Acessos Mensais", data: "10/04/2026" },
        { id: 2, nome: "Produtividade Setorial", data: "09/04/2026" },
    ];

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-blue-900 mb-6">Central de Relatórios</h1>
            <div className="grid gap-4">
                {relatorios.map(rel => (
                    <div key={rel.id} className="p-4 bg-white shadow-sm border rounded-lg flex justify-between items-center">
                        <span>{rel.nome}</span>
                        <button className="text-blue-600 font-semibold text-sm">Gerar PDF</button>
                    </div>
                ))}
            </div>
        </div>
    );
}