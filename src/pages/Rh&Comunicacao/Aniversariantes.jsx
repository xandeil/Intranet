import React, { useState } from 'react';
import { 
  Gift, 
  Search, 
  Calendar, 
  Mail, 
  Cake,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Heart
} from 'lucide-react';

const Aniversariantes = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [searchQuery, setSearchQuery] = useState('');

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const aniversariantes = [
    { id: 1, name: 'Anulia Reito', date: '15/05', day: 15, month: 4, department: 'Presidência', avatar: 'https://i.pravatar.cc/150?img=1', email: 'anulia.reito@jucepe.pe.gov.br', phone: '(81) 99999-1111' },
    { id: 2, name: 'Romelal Rivora', date: '16/05', day: 16, month: 4, department: 'RH', avatar: 'https://i.pravatar.cc/150?img=2', email: 'romelal.rivora@jucepe.pe.gov.br', phone: '(81) 99999-2222' },
    { id: 3, name: 'Lienos Santana', date: '18/05', day: 18, month: 4, department: 'Administração', avatar: 'https://i.pravatar.cc/150?img=3', email: 'lienos.santana@jucepe.pe.gov.br', phone: '(81) 99999-3333' },
    { id: 4, name: 'Jouseul Feira', date: '20/05', day: 20, month: 4, department: 'Comunicação', avatar: 'https://i.pravatar.cc/150?img=4', email: 'jouseul.feira@jucepe.pe.gov.br', phone: '(81) 99999-4444' },
    { id: 5, name: 'Maria Fernanda Costa', date: '22/05', day: 22, month: 4, department: 'TI', avatar: 'https://i.pravatar.cc/150?img=5', email: 'maria.costa@jucepe.pe.gov.br', phone: '(81) 99999-5555' },
    { id: 6, name: 'Carlos Eduardo Silva', date: '25/05', day: 25, month: 4, department: 'Financeiro', avatar: 'https://i.pravatar.cc/150?img=6', email: 'carlos.silva@jucepe.pe.gov.br', phone: '(81) 99999-6666' },
    { id: 7, name: 'Ana Paula Souza', date: '28/05', day: 28, month: 4, department: 'Jurídico', avatar: 'https://i.pravatar.cc/150?img=7', email: 'ana.souza@jucepe.pe.gov.br', phone: '(81) 99999-7777' },
    { id: 8, name: 'Pedro Henrique Lima', date: '30/05', day: 30, month: 4, department: 'Operações', avatar: 'https://i.pravatar.cc/150?img=8', email: 'pedro.lima@jucepe.pe.gov.br', phone: '(81) 99999-8888' },
    { id: 9, name: 'Juliana Martins', date: '01/06', day: 1, month: 5, department: 'RH', avatar: 'https://i.pravatar.cc/150?img=9', email: 'juliana.martins@jucepe.pe.gov.br', phone: '(81) 99999-9999' },
    { id: 10, name: 'Roberto Almeida', date: '05/06', day: 5, month: 5, department: 'Presidência', avatar: 'https://i.pravatar.cc/150?img=10', email: 'roberto.almeida@jucepe.pe.gov.br', phone: '(81) 98888-1111' },
  ];

  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth();

  const getStatus = (day, month) => {
    if (month === todayMonth && day === todayDay) return 'today';
    if (month === todayMonth && day > todayDay) return 'upcoming';
    if (month === todayMonth && day < todayDay) return 'past';
    if (month > todayMonth) return 'upcoming';
    return 'past';
  };

  const filteredAniversariantes = aniversariantes.filter(a => {
    const matchesMonth = a.month === currentMonth;
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         a.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMonth && matchesSearch;
  });

  const hoje = aniversariantes.filter(a => a.month === todayMonth && a.day === todayDay);
  const esteMes = aniversariantes.filter(a => a.month === currentMonth);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <Gift className="w-8 h-8 text-pink-500" />
            Aniversariantes
          </h1>
          <p className="text-gray-500 mt-1">Celebre com seus colegas de trabalho</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
          <button 
            onClick={() => setCurrentMonth(m => m === 0 ? 11 : m - 1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center gap-2 px-4">
            <Calendar className="w-5 h-5 text-jucepe-secondary" />
            <span className="font-semibold text-gray-800 min-w-[100px] text-center">
              {months[currentMonth]}
            </span>
          </div>
          
          <button 
            onClick={() => setCurrentMonth(m => m === 11 ? 0 : m + 1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Hoje Section */}
      {hoje.length > 0 && (
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6" />
            <h2 className="text-xl font-bold">🎉 Aniversariantes de Hoje</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hoje.map(person => (
              <div key={person.id} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4">
                <img src={person.avatar} alt={person.name} className="w-16 h-16 rounded-full border-4 border-white shadow-lg" />
                <div>
                  <p className="font-bold text-lg">{person.name}</p>
                  <p className="text-pink-100 text-sm">{person.department}</p>
                  <div className="flex gap-2 mt-2">
                    <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors" title="Enviar email">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors" title="Ver perfil">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-xl shadow-card border border-gray-100 p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nome ou departamento..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Grid de Aniversariantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAniversariantes.map((person) => {
          const status = getStatus(person.day, person.month);
          const statusStyles = {
            today: 'ring-4 ring-pink-400 bg-pink-50',
            upcoming: 'bg-white hover:shadow-lg',
            past: 'bg-gray-50 opacity-75'
          };

          return (
            <div 
              key={person.id} 
              className={`rounded-xl p-5 border border-gray-100 transition-all duration-300 ${statusStyles[status]}`}
            >
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img 
                    src={person.avatar} 
                    alt={person.name} 
                    className={`w-16 h-16 rounded-full object-cover border-2 ${status === 'today' ? 'border-pink-500' : 'border-gray-200'}`}
                  />
                  {status === 'today' && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                      <Cake className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 truncate">{person.name}</h3>
                  <p className="text-sm text-gray-500">{person.department}</p>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="w-4 h-4 text-jucepe-secondary" />
                    <span className={`text-sm font-medium ${
                      status === 'today' ? 'text-pink-600' : 'text-gray-600'
                    }`}>
                      {status === 'today' ? '🎂 Hoje!' : person.date}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                <button className="flex-1 py-2 text-sm font-medium text-jucepe-secondary hover:bg-jucepe-light rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </button>
                <button className="flex-1 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  Perfil
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAniversariantes.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600">Nenhum aniversariante encontrado</h3>
          <p className="text-gray-500">Tente buscar em outro mês ou ajustar os filtros</p>
        </div>
      )}
    </div>
  );
};

export default Aniversariantes;