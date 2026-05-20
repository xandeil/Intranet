import React from 'react';
import {
  ExternalLink, Globe, ShieldCheck,
  MessageSquare, Printer, Layout, Lock, Server
} from 'lucide-react';

const MonitoringLinkCard = ({ title, icon: Icon, url, subtitle }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
  >
    {/* Ícone e Indicador de Link Externo */}
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
        <Icon size={28} />
      </div>
      <ExternalLink size={20} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
    </div>

    {/* Textos */}
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-700">
        {title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed">
        {subtitle}
      </p>
    </div>

    {/* Rodapé do Card */}
    <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
      <span>Acessar Painel Grafana</span>
      <div className="h-[1px] flex-1 bg-blue-100"></div>
    </div>
  </a>
);

const PainelZabbixJucepe = () => {
  const dashboards = [
    {
      title: 'Link JUCEPE',
      icon: Globe,
      url: 'http://10.10.10.23:3000/d/fe4fbbfa-5eba-4c68-b7eb-2971042cc3a4/link-jucepe',
      subtitle: 'Monitoramento de tráfego de rede e latência da sede em tempo real.'
    },
    {
      title: 'Gestão de Chamados',
      icon: MessageSquare,
      url: 'http://10.10.10.23:3000/d/14bf24d5-57f8-4fef-821a-9145007c41c5/chamados',
      subtitle: 'Visão geral dos tickets de suporte e tempo de atendimento.'
    },
    {
      title: 'Impressoras',
      icon: Printer,
      url: 'http://10.10.10.23:3000/d/76bc16d6-f3b7-4b98-8284-ad2f07b2e6f6/impressoras',
      subtitle: 'Status de conectividade e níveis de suprimento do parque de impressão.'
    },
    {
      title: 'Certificados Digitais',
      icon: ShieldCheck,
      url: 'http://10.10.10.23:3000/d/d9f82298-6691-472e-b676-ab5f050b5fab/certificados',
      subtitle: 'Alerta de vencimento e status de validade dos certificados.'
    },
    {
      title: 'Site Institucional',
      icon: Layout,
      url: 'http://10.10.10.23:3000/d/ba143049-3834-4b30-9406-7a1c0f16b09b/site-jucepe',
      subtitle: 'Disponibilidade externa e métricas de acesso ao portal principal.'
    },
    {
      title: 'Squid Proxy',
      icon: Lock,
      url: 'http:///10.10.10.23:3000/public-dashboards/66a78ba612e74b7cafa2983137579e45',
      subtitle: 'Relatórios de filtragem de pacotes e regras de firewall.'
    },
    {
      title: 'Portal de Dashboards',
      icon: Layout,
      url: 'http://10.10.10.23:3000/dashboards',
      subtitle: 'Acesso direto à biblioteca completa de monitoramento do servidor.'
    }
  ];

  return (
    <section className="p-8">
      <div className="mb-8 border-l-4 border-blue-600 pl-4">
        <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight italic">
          Dashboards Externos
        </h2>
        <p className="text-gray-500">Clique para abrir o monitoramento detalhado no servidor Grafana</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboards.map((dash, index) => (
          <MonitoringLinkCard
            key={index}
            title={dash.title}
            icon={dash.icon}
            url={dash.url}
            subtitle={dash.subtitle}
          />
        ))}
      </div>
    </section>
  );
};

export default PainelZabbixJucepe;