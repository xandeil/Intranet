import React from 'react';

// Sub-componente para manter o padrão visual de cada gráfico
const GrafanaCard = ({ title, panelId }) => {
  // Configurações do Grafana: IP da JUCEPE + Tempo Real + Tema Light
  const serverIp = "10.10.10.23";
  const dashboardId = "fe4fbbfa-5eba-4c68-b7eb-2971042cc3a4";
  const baseUrl = `http://${serverIp}:3000/d-solo/${dashboardId}/link-jucepe`;
  
  // Montagem da URL com os parâmetros de tempo real (agora - 6 horas até agora)
  const finalUrl = `${baseUrl}?orgId=1&from=now-6h&to=now&panelId=${panelId}&theme=light&kiosk`;

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col h-full">
      <h3 className="text-[10px] font-bold text-jucepe-dark/50 uppercase tracking-widest mb-3 border-b pb-1">
        {title}
      </h3>
      <div className="flex-1 min-h-[200px] w-full overflow-hidden rounded-lg">
        <iframe
          src={finalUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          title={title}
        />
      </div>
    </div>
  );
};

export const LinkJucepeGroup = () => {
  // Mapeamento dos painéis baseado nos links que você me enviou
  const panels = [
    { id: "1", title: "Velocidade Download" },
    { id: "2", title: "Velocidade Upload" },
    { id: "3", title: "Tempo de Resposta" },
    { id: "4", title: "Perda de Pacotes" },
    { id: "5", title: "Latência" },
    { id: "6", title: "Status Gateway" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {panels.map((panel) => (
        <GrafanaCard key={panel.id} title={panel.title} panelId={panel.id} />
      ))}
    </div>
  );
};