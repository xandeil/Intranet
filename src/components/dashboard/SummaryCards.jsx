import React from 'react';
import { Link } from 'react-router-dom'; // 1. Importar o Link
import { FileText, Calendar, TrendingUp, Newspaper } from 'lucide-react';
import { summaryData } from '../../data/mockData.js';

const icons = {
  documents: FileText,
  schedules: Calendar,
  accesses: TrendingUp,
  news: Newspaper
};

const colors = {
  documents: 'bg-blue-50 text-blue-600',
  schedules: 'bg-indigo-50 text-indigo-600',
  accesses: 'bg-green-50 text-green-600',
  news: 'bg-cyan-50 text-cyan-600'
};

// 2. Definir os caminhos baseados nas suas rotas do App.jsx
const paths = {
  documents: '/documentos',
  schedules: '/cronogramas',
  accesses: '/relatorios',
  news: '/publicacoes'
};

const SummaryCards = () => {
  const cards = [
    { key: 'documents', title: 'Documentos', data: summaryData.documents },
    { key: 'schedules', title: 'Cronogramas', data: summaryData.schedules },
    { key: 'accesses', title: 'Acessos', data: summaryData.accesses },
    { key: 'news', title: 'Notícias', data: summaryData.news }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const IconComponent = icons[card.key];
        const colorClass = colors[card.key];
        const targetPath = paths[card.key]; // Pega o caminho correto
        
        return (
          /* 3. Trocar 'div' por 'Link' e adicionar o 'to' */
          <Link 
            key={card.key}
            to={targetPath}
            className="bg-white rounded-xl p-5 shadow-card card-hover cursor-pointer border border-gray-100 block transition-all hover:shadow-md hover:border-blue-200"
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-lg ${colorClass}`}>
                <IconComponent className="w-6 h-6" />
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-800">
                {card.data.count.toLocaleString()}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  {card.data.label}
                </span>
              </h3>
              <p className="text-sm font-semibold text-gray-700 mt-1">{card.title}</p>
              <p className="text-xs text-gray-500 mt-1">{card.data.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SummaryCards;