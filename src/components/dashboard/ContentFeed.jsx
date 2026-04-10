import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { publications } from '../../data/mockData.js';
import { Link } from 'react-router-dom';

const ContentFeed = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(publications.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visiblePublications = publications.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
<div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
  {/* Header */}
  <div className="flex items-center justify-between p-5 border-b border-gray-100">
    <h2 className="section-title">Publicações de Conteúdo</h2>
    
    {/* Trocamos o button pelo Link para funcionar a navegação */}
    <Link 
      to="/publicacoes" 
      className="text-sm text-jucepe-secondary hover:text-jucepe-primary font-medium flex items-center gap-1 transition-colors"
    >
      Ver todas
      <ChevronRight className="w-4 h-4" />
    </Link>
  </div>

      {/* Content */}
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visiblePublications.map((pub) => (
            <article 
              key={pub.id}
              className="group cursor-pointer rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={pub.image} 
                  alt={pub.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${pub.categoryColor}`}>
                    {pub.category}
                  </span>
                  <span className="text-xs text-gray-400">{pub.date}</span>
                </div>
                
                <h3 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2 group-hover:text-jucepe-secondary transition-colors">
                  {pub.title}
                </h3>
                
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                  {pub.excerpt}
                </p>

                <div className="mt-3 flex items-center gap-2 text-xs text-jucepe-secondary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3 h-3" />
                  Ler mais
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <button 
            onClick={prevPage}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>
          
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentPage === idx ? 'bg-jucepe-secondary w-4' : 'bg-gray-300'
              }`}
            />
          ))}
          
          <button 
            onClick={nextPage}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentFeed;