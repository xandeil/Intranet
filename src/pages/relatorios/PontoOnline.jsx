import React from 'react';

export default function PontoOnline() {
    return (
        <div className="p-8 bg-white rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-blue-900 mb-2">Registro de Ponto</h1>
            <div className="bg-blue-50 p-6 rounded-xl text-center border border-blue-100">
                <div className="text-4xl font-mono font-bold text-blue-900 mb-4">08:50:40</div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all">
                    Registrar Entrada/Saída
                </button>
            </div>
        </div>
    );
}