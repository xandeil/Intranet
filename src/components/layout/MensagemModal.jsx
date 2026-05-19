import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle2, Rocket, Lightbulb } from 'lucide-react';
// Importando seus componentes do Design System
import Button from '../ui/Button'; 
import Badge from '../ui/Badge';

const MensagemModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [naoMostrarHoje, setNaoMostrarHoje] = useState(false);

  const mensagens = [
    {
      titulo: 'Bem-vindo à Nova Intranet',
      tag: 'Lançamento',
      icon: <Rocket size={24} className="text-blue-200" />,
      conteudo: (
        <>
          <h3 className="text-center font-black text-blue-900 text-xl mb-4">
            PROJETO CENTRALIZAÇÃO DIGITAL
          </h3>
          
          <p className="mb-4 text-gray-700 leading-relaxed text-center text-lg">
            Este novo portal foi desenvolvido para{' '}
            <span className="text-blue-600 font-bold text-xl">centralizar todos os acessos internos</span>
            {' '}em um único ambiente. A ideia é facilitar o fluxo de trabalho e o acesso à informação.
          </p>

          <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-900 mb-6 text-gray-800">
            <ul className="list-none space-y-2 text-sm md:text-base">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                <strong>Dashboard Dinâmico:</strong> Visão geral de documentos e métricas.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                <strong>Módulos de RH:</strong> Aniversariantes e cronogramas integrados.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                <strong>Monitoramento:</strong> Acesso rápido a dados do site e Zabbix.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                <strong>Segurança:</strong> Área logada e controle de acessos.
              </li>
            </ul>
          </div>

          <p className="mb-4 text-gray-600 text-center italic">
            Tudo o que a JUCEPE precisa, agora está a um clique de distância.
          </p>

          <div className="text-center my-4">
            <a 
              href="https://www.jucepe.pe.gov.br" 
              target="_blank" 
              className="bg-blue-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition-all inline-block shadow-lg border-b-4 border-blue-950 active:border-b-0 active:translate-y-1"
            >
              Visitar Portal JUCEPE
            </a>
          </div>
        </>
      ),
    },
    {
      titulo: 'O Futuro do Trabalho Interno',
      tag: 'Eficiência',
      icon: <Lightbulb size={24} className="text-blue-200" />,
      conteudo: (
        <>
          <h3 className="text-center font-black text-blue-900 text-xl mb-4">
            EFICIÊNCIA E INTEGRAÇÃO
          </h3>
          
          <p className="mb-6 text-gray-700 leading-relaxed text-center text-lg">
            Obrigado por acompanhar esta apresentação! Este modal é apenas um exemplo de como podemos{' '}
            <span className="text-blue-600 font-bold italic text-xl">comunicar avisos importantes</span>
            {' '}de forma direta e eficaz para todos os servidores.
          </p>

          <div className="flex justify-center mb-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-2xl text-green-800 text-center shadow-sm">
              <span className="font-bold text-lg">💡 Sistema Pronto para Expansão</span><br/>
              Novos módulos e integrações podem ser adicionados conforme a necessidade da gestão.
            </div>
          </div>

          <p className="mb-2 text-gray-800 text-center font-bold text-lg">
            Agradecemos a atenção ao ler este projeto até o fim!
          </p>
          
          <p className="text-center text-gray-500 text-sm">
            Desenvolvido com foco na modernização tecnológica da JUCEPE.
          </p>
        </>
      ),
    }
  ];

  useEffect(() => {
    const dataSalva = localStorage.getItem('modal_aviso_data');
    const hoje = new Date().toLocaleDateString();
    if (dataSalva !== hoje) setIsOpen(true);
  }, []);

  const handleClose = () => {
    if (naoMostrarHoje) localStorage.setItem('modal_aviso_data', new Date().toLocaleDateString());
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-jucepe-dark/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative border border-jucepe-light animate-in zoom-in-95 duration-300">
        
        {/* HEADER COM BORDAS ARREDONDADAS NO TOPO */}
        <div className="bg-jucepe-dark p-6 flex items-center justify-between text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              {mensagens[currentMessageIndex].icon}
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight">{mensagens[currentMessageIndex].titulo}</h2>
              <Badge className="bg-white/20 text-white border-none">{mensagens[currentMessageIndex].tag}</Badge>
            </div>
          </div>
          <button onClick={handleClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-8">
          <div className="min-h-[220px] max-h-[50vh] overflow-y-auto px-2 custom-scrollbar">
            {mensagens[currentMessageIndex].conteudo}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex flex-col gap-6">
              {/* CHECKBOX */}
              <div className="flex justify-center">
                <label className="flex items-center gap-3 cursor-pointer group bg-jucepe-surface px-4 py-2 rounded-full border border-jucepe-light hover:border-jucepe-secondary transition-all">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded border-gray-300 text-jucepe-secondary focus:ring-jucepe-secondary cursor-pointer"
                    checked={naoMostrarHoje}
                    onChange={(e) => setNaoMostrarHoje(e.target.checked)}
                  />
                  <span className="text-jucepe-dark/60 text-sm font-bold group-hover:text-jucepe-dark transition-colors">
                    Não mostrar hoje
                  </span>
                </label>
              </div>

              {/* BOTÕES DE NAVEGAÇÃO USANDO SEU DESIGN SYSTEM */}
              <div className="flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  disabled={currentMessageIndex === 0}
                  onClick={() => setCurrentMessageIndex(prev => prev - 1)}
                  icon={ChevronLeft}
                >
                  Anterior
                </Button>

                <div className="flex gap-2">
                  {mensagens.map((_, idx) => (
                    <div key={idx} className={`h-1.5 rounded-full transition-all ${idx === currentMessageIndex ? 'w-6 bg-jucepe-secondary' : 'w-2 bg-jucepe-light'}`} />
                  ))}
                </div>

                {currentMessageIndex === mensagens.length - 1 ? (
                  <Button onClick={handleClose}>Entendido</Button>
                ) : (
                  <Button variant="secondary" onClick={() => setCurrentMessageIndex(prev => prev + 1)}>
                    Próxima <ChevronRight size={20} className="ml-1" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MensagemModal;