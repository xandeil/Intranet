// Config-driven routing: todos os caminhos internos da SPA em um único lugar,
// lidos de variáveis de ambiente (VITE_ROUTE_*) com fallback para o path atual do sistema.
//
// Qualquer componente que precise navegar (Link, useNavigate, menus) deve importar
// ROUTES daqui em vez de escrever a string do caminho na mão — assim uma rota nunca
// fica dessincronizada entre o App.jsx e o resto do app.

const env = import.meta.env;

const stripSlashes = (path) => path.replace(/^\/+|\/+$/g, '');

// Rotas de "primeiro nível", fora da área protegida (não vivem sob o Dashboard).
const login = env.VITE_ROUTE_LOGIN || '/login';
const dashboard = env.VITE_ROUTE_DASHBOARD || '/';

// Segmentos das páginas internas — relativos à raiz do Dashboard, não paths
// absolutos. Isso é o que permite VITE_ROUTE_DASHBOARD mudar de "/" para
// algo como "/dashboard" sem quebrar nada: cada página abaixo passa a viver
// em "/dashboard/perfil", "/dashboard/admin" etc. automaticamente, em vez de
// ficar apontando pro "/perfil" antigo enquanto a rota real mudou de lugar.
const segments = {
  perfil: env.VITE_ROUTE_PERFIL || 'perfil',
  perfilEditar: env.VITE_ROUTE_PERFIL_EDITAR || 'perfil/editar',
  configuracoes: env.VITE_ROUTE_CONFIGURACOES || 'configuracoes',

  documentos: env.VITE_ROUTE_DOCUMENTOS || 'documentos',
  publicacoes: env.VITE_ROUTE_PUBLICACOES || 'publicacoes',
  contato: env.VITE_ROUTE_CONTATO || 'contato',

  presidente: env.VITE_ROUTE_PRESIDENTE || 'presidente',
  aniversariantes: env.VITE_ROUTE_ANIVERSARIANTES || 'aniversariantes',
  cronogramas: env.VITE_ROUTE_CRONOGRAMAS || 'cronogramas',
  galeria: env.VITE_ROUTE_GALERIA || 'galeria',
  colaboradores: env.VITE_ROUTE_COLABORADORES || 'colaboradores',

  almoxarifado: env.VITE_ROUTE_ALMOXARIFADO || 'almoxarifado',
  equipamentos: env.VITE_ROUTE_EQUIPAMENTOS || 'equipamentos',
  plenaria: env.VITE_ROUTE_PLENARIA || 'plenaria',

  sistemas: env.VITE_ROUTE_SISTEMAS || 'sistemas',
  sistemasLinks: env.VITE_ROUTE_SISTEMAS_LINKS || 'sistemas/links',
  powerbi: env.VITE_ROUTE_POWERBI || 'powerbi',
  monitoramento: env.VITE_ROUTE_MONITORAMENTO || 'monitoramento',
  chamados: env.VITE_ROUTE_CHAMADOS || 'chamados',

  relatorios: env.VITE_ROUTE_RELATORIOS || 'relatorios',
  ponto: env.VITE_ROUTE_PONTO || 'ponto',
  timesheet: env.VITE_ROUTE_TIMESHEET || 'timesheet',

  admin: env.VITE_ROUTE_ADMIN || 'admin',
  publicar: env.VITE_ROUTE_PUBLICAR || 'administracao/publicar',
};

// Junta o prefixo do dashboard com um segmento relativo, sem duplicar barras.
// under('perfil') -> "/perfil" (quando dashboard === '/')
// under('perfil') -> "/dashboard/perfil" (quando dashboard === '/dashboard')
const under = (segment) => {
  const base = stripSlashes(dashboard);
  const clean = stripSlashes(segment);
  return base ? `/${base}/${clean}` : `/${clean}`;
};

// Paths absolutos, prontos pro uso em <Link to={ROUTES.x}> e navigate(ROUTES.x)
// em qualquer lugar do app (menus, widgets, redirects).
export const ROUTES = Object.freeze({
  login,
  dashboard,
  ...Object.fromEntries(
    Object.entries(segments).map(([key, segment]) => [key, under(segment)])
  ),
});

// Segmentos relativos (sem o prefixo do dashboard) — usados só dentro do
// App.jsx, para declarar as <Route> filhas do layout protegido. Rotas filhas
// do react-router-dom são relativas ao pai por natureza; se usássemos aqui os
// paths absolutos de ROUTES, o prefixo do dashboard seria somado em dobro.
export const ROUTE_SEGMENTS = Object.freeze(segments);
