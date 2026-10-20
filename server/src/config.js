// Lê e valida as variáveis de ambiente uma única vez, na subida do servidor.
// Se faltar alguma obrigatória, o processo para aqui com uma mensagem clara
// em vez de falhar depois, no meio de um login.

const obrigatorias = [
  'LOGIN_UNICO_API_URL',
  'LOGIN_UNICO_API_KEY',
  'LOGIN_UNICO_PORTAL_URL',
  'SESSION_SECRET',
  'PUBLIC_ORIGIN',
];

const faltando = obrigatorias.filter((nome) => !process.env[nome]);
if (faltando.length > 0) {
  console.error(`[config] Variáveis de ambiente ausentes: ${faltando.join(', ')}`);
  process.exit(1);
}

if (process.env.SESSION_SECRET.length < 32) {
  console.error('[config] SESSION_SECRET precisa ter pelo menos 32 caracteres.');
  process.exit(1);
}

const semBarraFinal = (url) => url.replace(/\/+$/, '');

export const config = {
  port: Number(process.env.PORT) || 3001,
  loginUnicoApiUrl: semBarraFinal(process.env.LOGIN_UNICO_API_URL),
  loginUnicoApiKey: process.env.LOGIN_UNICO_API_KEY,
  portalUrl: process.env.LOGIN_UNICO_PORTAL_URL,
  sessionSecret: new TextEncoder().encode(process.env.SESSION_SECRET),
  // Em segundos. Padrão: 8 horas.
  sessionTtl: Number(process.env.SESSION_TTL) || 8 * 60 * 60,
  publicOrigin: semBarraFinal(process.env.PUBLIC_ORIGIN),
  // E-mails e CPFs (só dígitos), em minúsculas, para comparar sem erro de digitação.
  adminUsers: (process.env.ADMIN_USERS || '')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean),
};
