import React from 'react';
import { 
  Calendar, Image, Newspaper, Users, Database, 
  Package, Monitor, Shield, Gift, LayoutGrid 
} from 'lucide-react';
import { quickAccessItems } from '../../data/mockData.js';
import Card from '../ui/Card'; // Importando o seu componente padronizado

const iconMap = {
  Calendar, Image, Newspaper, Users, Database, Package, Monitor, Shield, Gift
};

const QuickAccess = () => {
  return (
    // Usando o Card padronizado com título e ícone
    <Card title="Acesso Rápido" icon={LayoutGrid}>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {quickAccessItems.map((item) => {
          const IconComponent = iconMap[item.icon] || Database;
          
          return (
            <button
              key={item.id}
              className="flex items-start gap-3 p-4 rounded-jucepe border border-jucepe-light hover:border-jucepe-secondary/30 hover:shadow-hover transition-all duration-200 group text-left"
            >
              {/* Ícone com cor vinda do mockData, mas usando border-radius padronizado */}
              <div className={`p-2 rounded-lg ${item.color} group-hover:scale-110 transition-transform`}>
                <IconComponent className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-jucepe-dark leading-tight group-hover:text-jucepe-secondary transition-colors">
                  {item.label}
                </p>
                {item.subtitle && (
                  <p className="text-xs text-jucepe-dark/50 mt-0.5 truncate">
                    {item.subtitle}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default QuickAccess;