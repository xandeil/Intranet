import { config } from './config.js';

export class TokenInvalidoError extends Error {}

// Troca o redirectToken (UUID de uso único) pelos dados do usuário.
// Retorna { cpf, nome, email, tipo }.
// Lança TokenInvalidoError quando o Login Único recusa o token (expirado,
// já usado ou inexistente) e Error para falhas de rede/servidor.
export async function validarToken(redirectToken) {
  const resposta = await fetch(`${config.loginUnicoApiUrl}/portal/sso/validar-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Api-Key': config.loginUnicoApiKey,
    },
    body: JSON.stringify({ redirectToken }),
    signal: AbortSignal.timeout(10_000),
  });

  if (resposta.status === 401 || resposta.status === 400 || resposta.status === 404) {
    throw new TokenInvalidoError(`validar-token respondeu ${resposta.status}`);
  }
  if (!resposta.ok) {
    throw new Error(`validar-token respondeu ${resposta.status}`);
  }

  return resposta.json();
}
