import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Megaphone, Bell } from 'lucide-react';

const MensagemModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [naoMostrarHoje, setNaoMostrarHoje] = useState(false);

  const mensagens = [
{
      titulo: '🚀 Bem-vindo à Nova Intranet JUCEPE',
      conteudo: `
        <div class="text-center font-bold text-xl mb-4 text-blue-900">PROJETO CENTRALIZAÇÃO DIGITAL</div>
        
        <p class="mb-4 text-gray-700 leading-relaxed text-center text-lg">
          Este novo portal foi desenvolvido para <span class="text-blue-600 font-bold text-xl">centralizar todas as funções críticas</span> em um único ambiente. 
          A ideia é facilitar o fluxo de trabalho e o acesso à informação.
        </p>

        <div class="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-900 mb-6 text-gray-800">
          <ul class="list-none space-y-2 text-sm md:text-base">
            <li>✅ <strong>Dashboard Dinâmico:</strong> Visão geral de documentos e métricas.</li>
            <li>✅ <strong>Módulos de RH:</strong> Aniversariantes e cronogramas integrados.</li>
            <li>✅ <strong>Monitoramento:</strong> Acesso rápido a dados do site e Zabbix.</li>
            <li>✅ <strong>Segurança:</strong> Área logada e controle de acessos.</li>
          </ul>
        </div>

        <p class="mb-4 text-gray-600 text-center italic">
          Tudo o que a JUCEPE precisa, agora está a um clique de distância.
        </p>

        <div class="text-center my-4">
          <a href="https://www.jucepe.pe.gov.br" target="_blank" 
             class="bg-blue-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition-all inline-block shadow-lg border-b-4 border-blue-950 active:border-b-0 active:translate-y-1">
            Visitar Portal JUCEPE
          </a>
        </div>
      `,
    },
    {
      titulo: '🎯 O Futuro do Trabalho Interno',
      conteudo: `
        <div class="text-center font-bold text-xl mb-4 text-blue-900">EFICIÊNCIA E INTEGRAÇÃO</div>
        
        <p class="mb-6 text-gray-700 leading-relaxed text-center text-lg">
          Obrigado por acompanhar esta apresentação! Este modal é apenas um exemplo de como podemos 
          <span class="text-blue-600 font-bold italic text-xl">comunicar avisos importantes</span> 
          de forma direta e eficaz para todos os servidores.
        </p>

        <div class="flex justify-center mb-6">
          <div class="p-4 bg-green-50 border border-green-200 rounded-2xl text-green-800 text-center shadow-sm">
             <span class="font-bold text-lg">💡 Sistema Pronto para Expansão</span><br/>
             Novos módulos e integrações podem ser adicionados conforme a necessidade da gestão.
          </div>
        </div>

        <p class="mb-2 text-gray-800 text-center font-bold text-lg">
          Agradecemos a atenção ao ler este projeto até o fim!
        </p>
        
        <p class="text-center text-gray-500 text-sm">
          Desenvolvido com foco na modernização tecnológica da JUCEPE.
        </p>
      `,
    }
  ];

  useEffect(() => {
    const dataSalva = localStorage.getItem('modal_aviso_data');
    const hoje = new Date().toLocaleDateString();
    if (dataSalva !== hoje) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    if (naoMostrarHoje) {
      localStorage.setItem('modal_aviso_data', new Date().toLocaleDateString());
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blue-900/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative border border-blue-200 animate-in zoom-in-95 duration-300">
        
        {/* Header Superior em Azul Intranet */}
        <div className="bg-blue-900 p-6 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-800 rounded-lg">
              <Bell size={24} className="text-blue-200" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">{mensagens[currentMessageIndex].titulo}</h2>
          </div>
          <button onClick={handleClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-8">
          {/* Área da Mensagem (Fundo Branco Limpo) */}
          <div 
            className="min-h-[220px] max-h-[50vh] overflow-y-auto px-2 custom-scrollbar"
            dangerouslySetInnerHTML={{ __html: mensagens[currentMessageIndex].conteudo }}
          />

          {/* Footer do Modal */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex flex-col gap-6">
              
              {/* Checkbox de Ciência */}
              <div className="flex justify-center">
                <label className="flex items-center gap-3 cursor-pointer group bg-gray-50 px-4 py-2 rounded-full border border-gray-200 hover:border-blue-300 transition-all">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    checked={naoMostrarHoje}
                    onChange={(e) => setNaoMostrarHoje(e.target.checked)}
                  />
                  <span className="text-gray-600 text-sm font-medium group-hover:text-blue-900 transition-colors">
                    Estou ciente (não mostrar hoje)
                  </span>
                </label>
              </div>

              {/* Botões de Navegação */}
              <div className="flex items-center justify-between">
                <button 
                  disabled={currentMessageIndex === 0}
                  onClick={() => setCurrentMessageIndex(prev => prev - 1)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-400 hover:text-blue-900 disabled:opacity-0 transition-all"
                >
                  <ChevronLeft size={20} /> Anterior
                </button>

                <div className="flex gap-2">
                  {mensagens.map((_, idx) => (
                    <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === currentMessageIndex ? 'w-6 bg-blue-600' : 'bg-gray-200'}`} />
                  ))}
                </div>

                {currentMessageIndex === mensagens.length - 1 ? (
                  <button onClick={handleClose} className="bg-blue-900 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-blue-800 shadow-md hover:shadow-lg transition-all active:scale-95">
                    Entendido
                  </button>
                ) : (
                  <button onClick={() => setCurrentMessageIndex(prev => prev + 1)} className="bg-blue-50 text-blue-900 px-6 py-2.5 rounded-lg font-bold hover:bg-blue-100 transition-all flex items-center gap-2">
                    Próxima <ChevronRight size={20} />
                  </button>
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