import React, { useState } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, Eye, Calendar } from 'lucide-react';

const Publications = () => {
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'Todas', count: 45 },
    { id: 'rh', label: 'RH', count: 12 },
    { id: 'imprensa', label: 'Imprensa', count: 18 },
    { id: 'presidencia', label: 'Presidência', count: 8 },
    { id: 'admin', label: 'Administração', count: 7 }
  ];

  const publications = [
    {
      id: 1,
      title: 'R$ 6,6 mm cobrar pero para para ho do RSD',
      category: 'RH',
      categoryColor: 'bg-purple-100 text-purple-700',
      date: '2024-05-15',
      author: 'Maria Silva',
      views: 234,
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop',
      status: 'published'
    },
    {
      id: 2,
      title: 'Entramadecenças para comparante espacie',
      category: 'Imprensa',
      categoryColor: 'bg-blue-100 text-blue-700',
      date: '2024-05-14',
      author: 'João Santos',
      views: 189,
      image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=400&h=250&fit=crop',
      status: 'published'
    },
    {
      id: 3,
      title: 'Precisões intensesestes notícias em Siit et',
      category: 'Presidência',
      categoryColor: 'bg-green-100 text-green-700',
      date: '2024-05-13',
      author: 'Ana Costa',
      views: 567,
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=250&fit=crop',
      status: 'draft'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Publicações</h1>
          <p className="text-gray-500 mt-1">Gerencie notícias e comunicados oficiais</p>
        </div>
        
        <button className="btn-primary flex items-center gap-2 self-start">
          <Plus className="w-4 h-4" />
          Nova Publicação
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-card border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar publicações..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-jucepe-secondary focus:border-transparent outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
            <Filter className="w-4 h-4" />
            Filtros avançados
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === cat.id
                  ? 'bg-jucepe-secondary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                filter === cat.id ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Publications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publications.map((pub) => (
          <div key={pub.id} className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden group">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={pub.image} 
                alt={pub.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${pub.categoryColor}`}>
                  {pub.category}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  pub.status === 'published' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                }`}>
                  {pub.status === 'published' ? 'Publicado' : 'Rascunho'}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-jucepe-secondary transition-colors">
                {pub.title}
              </h3>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {pub.date}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {pub.views} visualizações
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-jucepe-light flex items-center justify-center text-xs font-semibold text-jucepe-secondary">
                    {pub.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-sm text-gray-600">{pub.author}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-jucepe-secondary transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Publications;