import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Image as ImageIcon, ChevronRight } from 'lucide-react';
import { birthdayList, photoGallery } from '../../data/mockData.js';

const RHSocialWidget = () => {
  return (
    <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <h2 className="section-title">Módulo RH / Social</h2>

        {/* Link para a página de aniversariantes que criamos */}
        <Link
          to="/aniversariantes"
          className="text-sm text-jucepe-secondary hover:text-jucepe-primary font-medium flex items-center gap-1 transition-colors"
        >
          Ver todos
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="p-5 space-y-6">
        {/* Birthday List */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Gift className="w-4 h-4 text-pink-500" />
            <h3 className="text-sm font-semibold text-gray-700">Lista de Aniversariantes</h3>
          </div>

          <div className="space-y-3">
            {birthdayList.map((person) => (
              <div
                key={person.id}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{person.name}</p>
                  <p className={`text-xs ${person.status === 'today' ? 'text-pink-600 font-semibold' : 'text-gray-500'
                    }`}>
                    {person.status === 'today' && '🎉 '}
                    Aniversário {person.date.toLowerCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Gallery */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-semibold text-gray-700">Galeria de Fotos</h3>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {photoGallery.map((photo) => (
              <div
                key={photo.id}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer group relative"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RHSocialWidget;