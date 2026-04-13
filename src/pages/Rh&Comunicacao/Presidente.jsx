import React from 'react';
import { Calendar, Clock, MapPin, Users, Award, ExternalLink } from 'lucide-react';

const compromissos = [
  {
    id: 1,
    hora: '09:00',
    titulo: 'Reunião de Diretoria Executiva',
    local: 'Sala de Atos - Sede JUCEPE',
    descricao: 'Alinhamento estratégico sobre o Recadastramento de Leiloeiros 2026.',
    status: 'Concluído',
    categoria: 'Interno'
  },
  {
    id: 2,
    hora: '11:30',
    titulo: 'Despacho Administrativo',
    local: 'Gabinete da Presidência',
    descricao: 'Assinatura de portarias e termos de fomento.',
    status: 'Em andamento',
    categoria: 'Administrativo'
  },
  {
    id: 3,
    hora: '14:30',
    titulo: 'Encontro com Secretaria de Desenvolvimento Econômico',
    local: 'Sede da SDEC / Recife',
    descricao: 'Discussão sobre simplificação de processos para o Selo Empresa Verde.',
    status: 'Agendado',
    categoria: 'Externo'
  },
  {
    id: 4,
    hora: '16:00',
    titulo: 'Entrevista: Modernização da Junta Comercial',
    local: 'Estúdio de Comunicação (Virtual)',
    descricao: 'Pauta: Digitalização 100% dos processos em Pernambuco.',
    status: 'Agendado',
    categoria: 'Comunicação'
  }
];

export default function Presidente() {
  const dataHoje = new Date().toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Cabeçalho de Destaque */}
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-900 flex items-center gap-3 uppercase tracking-tight">
            <Award className="w-10 h-10 text-blue-600" />
            Agenda da Presidência
          </h1>
          <p className="text-gray-500 mt-2 font-medium capitalize">
            {dataHoje}
          </p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-blue-200 px-4 py-2 rounded-lg text-blue-700 font-bold hover:bg-blue-50 transition-all shadow-sm">
          <Calendar className="w-4 h-4" /> Agenda Completa
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Coluna da Esquerda: Timeline de Compromissos */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5" /> Compromissos do Dia
          </h2>

          <div className="relative border-l-2 border-blue-200 ml-4 space-y-8 pb-4">
            {compromissos.map((item) => (
              <div key={item.id} className="relative pl-8">
                {/* Círculo da Timeline */}
                <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-white shadow-sm ${
                  item.status === 'Concluído' ? 'bg-green-500' : 
                  item.status === 'Em andamento' ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
                }`} />
                
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-blue-900 font-black text-lg">{item.hora}</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${
                      item.categoria === 'Externo' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.categoria}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{item.titulo}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.local}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed italic">
                    {item.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna da Direita: Painel Informativo */}
        <div className="space-y-6">
          <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4">Nota da Presidência</h3>
              <p className="text-blue-100 text-sm leading-relaxed italic mb-4">
                "Foco total na simplificação do ambiente de negócios. Nossa meta em 2026 é reduzir o tempo de abertura de empresas para menos de 2 horas em todo o Estado."
              </p>
              <div className="w-12 h-1 bg-blue-400"></div>
            </div>
            <Users className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5" />
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" /> Contato Direto
            </h3>
            <div className="space-y-4 text-sm">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-xs">Chefia de Gabinete</p>
                <p className="text-gray-700 font-bold">gab.presidencia@jucepe.pe.gov.br</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-xs">Secretaria Executiva</p>
                <p className="text-gray-700 font-bold">(81) 3182-XXXX</p>
              </div>
            </div>
            <button className="w-full mt-6 py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-xs font-bold hover:border-blue-300 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
               Protocolar Ofício <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}