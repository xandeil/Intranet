// Dados mockados para a Intranet JUCEPE

export const summaryData = {
  documents: { count: 24, label: 'novos', description: 'Acesse e publique documentos' },
  schedules: { count: 5, label: 'próximos', description: 'Planeje e acompanhe prazos' },
  accesses: { count: 1256, label: 'visitas hoje', description: 'Relatórios de acessos ao site' },
  news: { count: 3, label: 'novas', description: 'Fique por dentro das novidades' }
};

export const publications = [
  {
    id: 1,
    category: 'RH',
    categoryColor: 'bg-purple-100 text-purple-700',
    title: 'R$ 6,6 mm cobrar pero para para ho do RSD...',
    date: 'Hoje',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop',
    excerpt: 'Novas diretrizes para gestão de recursos humanos e benefícios.'
  },
  {
    id: 2,
    category: 'Imprensa',
    categoryColor: 'bg-blue-100 text-blue-700',
    title: 'Entramadecenças para comparante espacie...',
    date: 'Ontem',
    image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=400&h=250&fit=crop',
    excerpt: 'Comunicado oficial sobre novas parcerias institucionais.'
  },
  {
    id: 3,
    category: 'Presidência',
    categoryColor: 'bg-green-100 text-green-700',
    title: 'Precisões intensesestes notícias em Siit et',
    date: '2 dias atrás',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=250&fit=crop',
    excerpt: 'Decisões estratégicas da diretoria executiva.'
  },
  {
    id: 4,
    category: 'Administração',
    categoryColor: 'bg-orange-100 text-orange-700',
    title: 'Novos processos de licitação para 2024',
    date: '3 dias atrás',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop',
    excerpt: 'Atualização nos procedimentos administrativos.'
  }
];

export const birthdayList = [
  { id: 1, name: 'Anulia Reito', date: 'Hoje', avatar: 'https://i.pravatar.cc/150?img=1', status: 'today' },
  { id: 2, name: 'Romelal Rivora', date: 'Amanhã', avatar: 'https://i.pravatar.cc/150?img=2', status: 'tomorrow' },
  { id: 3, name: 'Lienos Santana', date: 'Em 3 dias', avatar: 'https://i.pravatar.cc/150?img=3', status: 'upcoming' },
  { id: 4, name: 'Jouseul Feira', date: 'Em 5 dias', avatar: 'https://i.pravatar.cc/150?img=4', status: 'upcoming' }
];

export const photoGallery = [
  { id: 1, src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=150&h=150&fit=crop', alt: 'Reunião 1' },
  { id: 2, src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=150&h=150&fit=crop', alt: 'Reunião 2' },
  { id: 3, src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=150&fit=crop', alt: 'Evento 1' },
  { id: 4, src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop', alt: 'Equipe' },
  { id: 5, src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=150&h=150&fit=crop', alt: 'Trabalho' },
  { id: 6, src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=150&h=150&fit=crop', alt: 'Cerimônia' }
];

export const monitoringData = {
  users: { value: 1256, label: 'Usuários' },
  sessions: { value: '15,3K', label: 'Sessões/rejeição' },
  rejectionRate: { value: '35,0%', label: 'Taxa de rejeição' },
  avgTime: { value: '2m 45s', label: 'Tempo médio' },
  serverStatus: 'online',
  serverName: 'Servidor Zabbix'
};

export const chartData = [
  { name: 'Seg', users: 400, sessions: 240 },
  { name: 'Ter', users: 300, sessions: 139 },
  { name: 'Qua', users: 200, sessions: 980 },
  { name: 'Qui', users: 278, sessions: 390 },
  { name: 'Sex', users: 189, sessions: 480 },
  { name: 'Sáb', users: 239, sessions: 380 },
  { name: 'Dom', users: 349, sessions: 430 },
];

export const quickAccessItems = [
  { id: 1, icon: 'Calendar', label: 'Agenda do Presidente', color: 'bg-blue-100 text-blue-600' },
  { id: 2, icon: 'Image', label: 'Galeria de Fotos', color: 'bg-purple-100 text-purple-600' },
  { id: 3, icon: 'Newspaper', label: 'Gerenciador de Notícias', subtitle: 'RH e Imprensa', color: 'bg-green-100 text-green-600' },
  { id: 4, icon: 'Users', label: 'Permissões de Usuário', color: 'bg-orange-100 text-orange-600' },
  { id: 5, icon: 'Database', label: 'Extração de Dados', color: 'bg-indigo-100 text-indigo-600' },
  { id: 6, icon: 'Package', label: 'Inventário Almoxarifado', color: 'bg-red-100 text-red-600' },
  { id: 7, icon: 'Monitor', label: 'Gerenciador de Saída de Equipamentos', color: 'bg-cyan-100 text-cyan-600' },
  { id: 8, icon: 'Shield', label: 'Controle de Uso da Plenária', color: 'bg-teal-100 text-teal-600' },
  { id: 9, icon: 'Gift', label: 'Lista de Aniversariantes', subtitle: 'RH', color: 'bg-pink-100 text-pink-600' }
];

export const recentActivities = [
  { 
    id: 1, 
    type: 'document', 
    title: 'Novo documento publicado: Relatório Mensal - Maio/2024',
    author: 'Maria Silva',
    time: 'Há 1 hora',
    icon: 'FileText',
    color: 'bg-blue-100 text-blue-600'
  },
  { 
    id: 2, 
    type: 'schedule', 
    title: 'Cronograma atualizado: Reunião de Diretoria',
    author: 'João Santos',
    time: 'Há 3 horas',
    icon: 'Calendar',
    color: 'bg-green-100 text-green-600'
  },
  { 
    id: 3, 
    type: 'birthday', 
    title: 'Novo aniversariante cadastrado: Carlos Lima',
    author: 'Ana Souza',
    time: 'Há 5 horas',
    icon: 'Gift',
    color: 'bg-pink-100 text-pink-600'
  },
  { 
    id: 4, 
    type: 'news', 
    title: 'Notícia publicada: JUCEPE lança novo portal',
    author: 'Redação',
    time: 'Ontem',
    icon: 'Megaphone',
    color: 'bg-yellow-100 text-yellow-600'
  }
];

export const importantLinks = [
  { id: 1, name: 'REGIN', icon: 'Globe', url: '#' },
  { id: 2, name: 'RU', icon: 'Building', url: '#' },
  { id: 3, name: 'iGED', icon: 'Globe', url: '#' },
  { id: 4, name: 'SEI', icon: 'FileCheck', url: '#' },
  { id: 5, name: 'SELOVERDE', icon: 'Leaf', url: '#' },
  { id: 6, name: 'EXPRESSO', icon: 'Mail', url: '#' },
  { id: 7, name: 'CSATI', icon: 'Server', url: '#' },
  { id: 8, name: 'SIP', icon: 'Phone', url: '#' },
  { id: 9, name: 'Ponto Online', icon: 'Clock', url: '#' },
  { id: 10, name: 'Timesheet JUCEPE', icon: 'Spreadsheet', url: '#' }
];

export const userData = {
  name: 'Usuário',
  area: 'Presidência',
  avatar: 'https://i.pravatar.cc/150?img=11',
  notifications: 3,
  messages: 2
};

export const navigationSections = [
  {
    title: 'NAVEGAÇÃO',
    items: [
      { id: 'inicio', label: 'Início', icon: 'Home', path: '/' },
      { id: 'documentos', label: 'Documentos', icon: 'FileText', path: '/documentos' },
      { id: 'publicacoes', label: 'Publicações', icon: 'BookOpen', path: '/publicacoes' },
      { id: 'contato', label: 'Contato', icon: 'Mail', path: '/contato' },
      { id: 'admin', label: 'Administração', icon: 'Settings', path: '/admin' }
    ]
  },
  {
    title: 'RH & COMUNICAÇÃO',
    items: [
      { id: 'presidente', label: 'Presidente', icon: 'User', path: '/presidente' },
      { id: 'aniversariantes', label: 'Aniversariantes', icon: 'Gift', path: '/aniversariantes' },
      { id: 'cronogramas', label: 'Cronogramas', icon: 'Calendar', path: '/cronogramas' }
    ]
  },
  {
    title: 'SISTEMAS INTERNOS',
    items: [
      { id: 'sistemas', label: 'Sistemas Internos', icon: 'Layers', path: '/sistemas' },
      { id: 'powerbi', label: 'Power BI', icon: 'BarChart3', path: '/powerbi' },
      { id: 'monitoramento', label: 'Monitoramento', icon: 'Activity', path: '/monitoramento' }
    ]
  },
  {
    title: 'RELATÓRIOS',
    items: [
      { id: 'relatorios', label: 'Relatórios', icon: 'FileBarChart', path: '/relatorios' },
      { id: 'ponto', label: 'Ponto Online', icon: 'Clock', path: '/ponto' },
      { id: 'timesheet', label: 'Timesheet JUCEPE', icon: 'Timer', path: '/timesheet' }
    ]
  }
];