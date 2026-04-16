import React from 'react';
import { 
  Globe, 
  Building, 
  FileCheck, 
  Leaf, 
  Mail, 
  Server, 
  Phone, 
  Clock, 
  FileSpreadsheet, // Verifique se é esse o nome no seu import
  TestTube,        // Adicione este para o Link de Homologação
  History          // Adicione este para o Portal Antigo
} from 'lucide-react';
import { importantLinks } from '../../data/mockData.js';

const iconMap = {
  Globe, Building, FileCheck, Leaf, Mail, Server, Phone, Clock, FileSpreadsheet
};

const ImportantLinks = () => {
  return (
    <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <h2 className="section-title">Links Importantes</h2>
        <button className="text-sm text-jucepe-secondary hover:text-jucepe-primary font-medium flex items-center gap-1">
          Ver todos
          <span className="w-4 h-4 rounded-full bg-jucepe-secondary text-white text-xs flex items-center justify-center">
            →
          </span>
        </button>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 gap-3">
          {importantLinks.map((link) => {
            const IconComponent = iconMap[link.icon] || Globe;
            
            return (
              <a
                key={link.id}
                href={link.url}
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-jucepe-secondary/30 hover:bg-blue-50/50 transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-full bg-jucepe-light flex items-center justify-center group-hover:bg-jucepe-secondary group-hover:text-white transition-colors">
                  <IconComponent className="w-4 h-4 text-jucepe-secondary group-hover:text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-jucepe-secondary transition-colors">
                  {link.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImportantLinks;