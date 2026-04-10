import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  X, 
  Check, 
  AlertCircle,
  Image as ImageIcon,
  Link as LinkIcon,
  Tag,
  User,
  Calendar,
  Eye,
  Save,
  Send
} from 'lucide-react';

const Publicar = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    author: '',
    publishDate: '',
    status: 'draft',
    featured: false,
    allowComments: true
  });

  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const categories = [
    { id: 'rh', label: 'RH', color: 'bg-purple-100 text-purple-700' },
    { id: 'imprensa', label: 'Imprensa', color: 'bg-blue-100 text-blue-700' },
    { id: 'presidencia', label: 'Presidência', color: 'bg-green-100 text-green-700' },
    { id: 'administracao', label: 'Administração', color: 'bg-orange-100 text-orange-700' },
    { id: 'ti', label: 'TI', color: 'bg-cyan-100 text-cyan-700' },
    { id: 'comunicacao', label: 'Comunicação', color: 'bg-pink-100 text-pink-700' }
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (newFiles) => {
    const fileArray = Array.from(newFiles).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type: file.type,
      progress: 0
    }));
    
    setFiles(prev => [...prev, ...fileArray]);
    
    // Simular upload
    fileArray.forEach(file => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, progress } : f
        ));
        if (progress >= 100) clearInterval(interval);
      }, 200);
    });
  };

  const removeFile = (id) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Publicação salva com sucesso!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <FileText className="w-8 h-8 text-jucepe-secondary" />
            Nova Publicação
          </h1>
          <p className="text-gray-500 mt-1">Crie e publique conteúdo para a intranet</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setPreviewMode(!previewMode)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            {previewMode ? 'Editar' : 'Pré-visualizar'}
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" />
            Salvar Rascunho
          </button>
          <button 
            onClick={handleSubmit}
            className="btn-primary flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Publicar
          </button>
        </div>
      </div>

      {previewMode ? (
        /* Preview Mode */
        <div className="bg-white rounded-xl shadow-card border border-gray-100 p-8 max-w-4xl mx-auto">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
              categories.find(c => c.id === formData.category)?.color || 'bg-gray-100 text-gray-700'
            }`}>
              {categories.find(c => c.id === formData.category)?.label || 'Sem categoria'}
            </span>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{formData.title || 'Título da Publicação'}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {formData.author || 'Autor não definido'}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formData.publishDate || new Date().toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {formData.content || 'Conteúdo da publicação...'}
            </p>
          </div>

          {files.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Anexos</h3>
              <div className="space-y-2">
                {files.map(file => (
                  <div key={file.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-jucepe-secondary" />
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <span className="text-xs text-gray-500">{file.size}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Edit Mode */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-card border border-gray-100 p-6">
              <div className="space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título da Publicação *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-jucepe-secondary focus:border-transparent outline-none text-lg"
                    placeholder="Digite um título claro e objetivo"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Conteúdo *
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    rows={12}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-jucepe-secondary focus:border-transparent outline-none resize-none"
                    placeholder="Escreva o conteúdo da publicação..."
                  />
                  <p className="text-xs text-gray-500 mt-1">Use formatação simples. Markdown será implementado em breve.</p>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Anexos e Imagens
                  </label>
                  
                  <div 
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                      dragActive ? 'border-jucepe-secondary bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-2">
                      Arraste arquivos aqui ou{' '}
                      <label className="text-jucepe-secondary hover:underline cursor-pointer">
                        clique para selecionar
                        <input 
                          type="file" 
                          multiple 
                          className="hidden" 
                          onChange={(e) => handleFiles(e.target.files)}
                        />
                      </label>
                    </p>
                    <p className="text-xs text-gray-500">PDF, DOCX, XLSX, JPG, PNG até 10MB cada</p>
                  </div>

                  {/* File List */}
                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {files.map(file => (
                        <div key={file.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          {file.type.startsWith('image/') ? (
                            <ImageIcon className="w-5 h-5 text-purple-500" />
                          ) : (
                            <FileText className="w-5 h-5 text-blue-500" />
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size}</p>
                            
                            {file.progress < 100 ? (
                              <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-jucepe-secondary transition-all duration-300"
                                  style={{ width: `${file.progress}%` }}
                                />
                              </div>
                            ) : (
                              <span className="text-xs text-green-600 flex items-center gap-1">
                                <Check className="w-3 h-3" /> Upload completo
                              </span>
                            )}
                          </div>
                          
                          <button 
                            onClick={() => removeFile(file.id)}
                            className="p-1 hover:bg-red-100 rounded text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            {/* Category */}
            <div className="bg-white rounded-xl shadow-card border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5 text-jucepe-secondary" />
                <h3 className="font-semibold text-gray-800">Categoria</h3>
              </div>
              
              <div className="space-y-2">
                {categories.map(cat => (
                  <label 
                    key={cat.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      formData.category === cat.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={cat.id}
                      checked={formData.category === cat.id}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="text-jucepe-secondary focus:ring-jucepe-secondary"
                    />
                    <span className={`px-2 py-1 rounded text-xs font-medium ${cat.color}`}>
                      {cat.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Publishing Options */}
            <div className="bg-white rounded-xl shadow-card border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-jucepe-secondary" />
                <h3 className="font-semibold text-gray-800">Publicação</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Autor</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                      className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-jucepe-secondary outline-none text-sm"
                      placeholder="Nome do autor"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data de Publicação</label>
                  <input
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => setFormData({...formData, publishDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-jucepe-secondary outline-none text-sm"
                  />
                </div>

                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <p className="text-xs text-yellow-700">
                    Agendar para depois salvará como rascunho até a data definida.
                  </p>
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="bg-white rounded-xl shadow-card border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-800 mb-4">Opções</h3>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="rounded border-gray-300 text-jucepe-secondary focus:ring-jucepe-secondary"
                  />
                  <span className="text-sm text-gray-700">Destacar na página inicial</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.allowComments}
                    onChange={(e) => setFormData({...formData, allowComments: e.target.checked})}
                    className="rounded border-gray-300 text-jucepe-secondary focus:ring-jucepe-secondary"
                  />
                  <span className="text-sm text-gray-700">Permitir comentários</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Publicar;