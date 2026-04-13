import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Save, X, User, Mail, Building, Briefcase, MapPin } from 'lucide-react';
import { userData } from '../../data/mockData';

export default function EditProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Referência para o input de arquivo
  
  // Estado para os campos de texto
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    area: userData.area,
    role: userData.role || 'Servidor Público',
    bio: "Especialista em processos administrativos e gestão pública.",
  });

  // Estado para controlar o preview da imagem
  const [avatarPreview, setAvatarPreview] = useState(userData.avatar);

  // Função para abrir o seletor de arquivos ao clicar na foto ou texto
  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  // Função para processar a nova imagem e gerar o preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result); // Atualiza o src da imagem na tela
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui no futuro você faria o "fetch" para o Back-end
    console.log("Dados salvos:", { ...formData, avatar: avatarPreview });
    alert("Perfil atualizado com sucesso! (Simulação)");
    navigate('/perfil');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        
        {/* Cabeçalho de Ação */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-blue-900 uppercase">Editar Perfil</h1>
            <p className="text-gray-500 text-sm">Atualize suas informações profissionais na JUCEPE</p>
          </div>
          <button 
            onClick={() => navigate('/perfil')}
            className="p-2 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Seção da Foto */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
            <div 
              className="relative group cursor-pointer" 
              onClick={triggerFileSelect}
            >
              <img 
                src={avatarPreview} 
                className="w-32 h-32 rounded-3xl object-cover border-4 border-blue-50 shadow-inner"
                alt="Avatar"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white" size={28} />
              </div>
            </div>

            {/* Input de arquivo real, porém invisível */}
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
            />

            <p 
              className="mt-4 text-xs font-bold text-blue-600 uppercase tracking-widest cursor-pointer hover:text-blue-800 transition-colors"
              onClick={triggerFileSelect}
            >
              Alterar Foto de Identificação
            </p>
          </div>

          {/* Informações Básicas */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-4">Dados Pessoais</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 ml-1">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 ml-1">E-mail Institucional</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all text-sm"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 ml-1">Bio / Descrição Curta</label>
              <textarea 
                rows="3"
                className="w-full p-4 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all text-sm resize-none"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
              ></textarea>
            </div>
          </div>

          {/* Informações Profissionais (Desabilitadas para simular segurança) */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 opacity-70">
            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
              <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">Dados Funcionais</h2>
              <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-bold">Somente Leitura</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 ml-1">Setor</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input type="text" disabled className="w-full pl-10 pr-4 py-3 bg-gray-100 border-none rounded-xl text-sm text-gray-500 cursor-not-allowed" value={formData.area} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 ml-1">Cargo</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input type="text" disabled className="w-full pl-10 pr-4 py-3 bg-gray-100 border-none rounded-xl text-sm text-gray-500 cursor-not-allowed" value={formData.role} />
                </div>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-4 pt-4">
            <button 
              type="submit"
              className="flex-1 bg-blue-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
            >
              <Save size={20} /> Salvar Alterações
            </button>
            <button 
              type="button"
              onClick={() => navigate('/perfil')}
              className="px-8 py-4 bg-white text-gray-500 font-bold rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all"
            >
              Cancelar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}