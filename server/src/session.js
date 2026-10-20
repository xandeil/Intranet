import { SignJWT, jwtVerify } from 'jose';
import { config } from './config.js';

export const COOKIE_NAME = 'intranet_session';

export const cookieOptions = {
  httpOnly: true, // o JavaScript do navegador não consegue ler o cookie
  secure: true, // só trafega em HTTPS (navegadores abrem exceção para localhost)
  sameSite: 'lax', // não é enviado em POSTs vindos de outros sites (proteção CSRF)
  path: '/',
};

const somenteDigitos = (valor) => String(valor || '').replace(/\D/g, '');

// O validar-token ainda não devolve perfil; por enquanto o admin vem da lista
// ADMIN_USERS. Quando o campo "perfil" existir, é aqui que ele entra.
function definirPerfil({ cpf, email }) {
  const ehAdmin =
    (email && config.adminUsers.includes(email.toLowerCase())) ||
    (cpf && config.adminUsers.includes(somenteDigitos(cpf)));

  return ehAdmin
    ? { role: 'admin', permissions: ['read', 'write', 'admin'] }
    : { role: 'user', permissions: ['read'] };
}

// Monta o usuário da Intranet a partir da resposta do Login Único.
export function criarUsuario({ cpf, nome, email, tipo }) {
  return {
    id: somenteDigitos(cpf),
    name: nome,
    email,
    tipo,
    ...definirPerfil({ cpf, email }),
  };
}

export async function assinarSessao(usuario) {
  return new SignJWT({ user: usuario })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(usuario.id)
    .setIssuedAt()
    .setExpirationTime(`${config.sessionTtl}s`)
    .sign(config.sessionSecret);
}

// Retorna o usuário da sessão ou null se o token for inválido/expirado.
export async function lerSessao(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, config.sessionSecret, {
      algorithms: ['HS256'],
    });
    return payload.user;
  } catch {
    return null;
  }
}
