import React from 'react';
import { 
  Calendar, Image, Newspaper, Users, Database, 
  Package, Monitor, Shield, Gift, LayoutGrid, ChevronRight 
} from 'lucide-react';
import { quickAccessItems } from '../../data/mockData.js';
import Card from '../ui/Card';

const iconMap = {
  Calendar, Image, Newspaper, Users, Database, Package, Monitor, Shield, Gift
};

const QuickAccess = () => {
  return (
    /* Adicionei rounded-2xl e overflow-hidden para garantir que as bordas fiquem redondas como o resto do site */
    <Card title="Acesso Rápido" icon={LayoutGrid} className="rounded-2xl overflow-hidden border-none shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-1">
        {quickAccessItems.map((item) => {
          const IconComponent = iconMap[item.icon] || Database;
          
          return (
            <button
              key={item.id}
              /* rounded-xl garante que o botão interno também seja arredondado */
              className="flex items-center gap-3 p-3 rounded-xl border border-jucepe-light bg-white hover:border-jucepe-secondary/40 hover:shadow-md transition-all duration-300 group text-left"
            >
              {/* Ícone com bordas arredondadas suaves */}
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${item.color.replace('bg-', 'bg-opacity-10 bg-')} ${item.color.replace('bg-', 'text-')} shrink-0`}>
                <IconComponent className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-bold text-jucepe-dark leading-tight group-hover:text-jucepe-secondary transition-colors truncate">
                  {item.label}
                </p>
                <p className="text-[10px] text-jucepe-dark/40 font-bold uppercase tracking-tighter">
                  Abrir
                </p>
              </div>

              <ChevronRight className="w-4 h-4 text-jucepe-secondary opacity-0 group-hover:opacity-100 transition-all shrink-0" />
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default QuickAccess;