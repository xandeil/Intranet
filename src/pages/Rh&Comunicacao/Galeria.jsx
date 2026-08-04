import React, { useState } from 'react';
import { Image as ImageIcon, Upload, X } from 'lucide-react';
import { photoGallery } from '../../data/mockData.js';

export default function Galeria() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-blue-900 flex items-center gap-3 uppercase tracking-tight">
            <ImageIcon className="w-8 h-8 text-blue-600" />
            Galeria de Fotos
          </h1>
          <p className="text-gray-500 text-sm mt-1">Registros de eventos, reuniões e momentos da equipe JUCEPE</p>
        </div>

        <button className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-all shadow-sm">
          <Upload className="w-4 h-4" /> Enviar Fotos
        </button>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {photoGallery.map((photo) => (
          <button
            key={photo.id}
            onClick={() => setSelected(photo)}
            className="aspect-square rounded-xl overflow-hidden relative group border border-gray-100 shadow-sm"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-3">
              <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                {photo.alt}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox simples */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white"
            onClick={() => setSelected(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selected.src}
            alt={selected.alt}
            className="max-h-[80vh] max-w-full rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
