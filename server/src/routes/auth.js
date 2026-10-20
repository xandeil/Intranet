import { Router } from 'express';
import { config } from '../config.js';
import { validarToken, TokenInvalidoError } from '../loginUnico.js';
import {
  COOKIE_NAME,
  cookieOptions,
  criarUsuario,
  assinarSessao,
  lerSessao,
} from '../session.js';

const router = Router();

// --- Entrada do SSO --------------------------------------------------------
// O portal faz um POST de formulário (campo "redirect_token") para
// {urlDestino}/login_unico; com urlDestino = /auth/sso, chega em
// /auth/sso/login_unico. /auth/sso, o GET e a grafia "redirectToken" ficam
// como alternativas.
async function receberSso(req, res) {
  const origem = { ...req.query, ...req.body };
  const campo = origem.redirectToken ? 'redirectToken' : 'redirect_token';
  const redirectToken = origem[campo];

  if (!redirectToken || typeof redirectToken !== 'string') {
    console.warn(`[sso] requisição sem token (campos recebidos: ${Object.keys(origem).join(', ') || 'nenhum'})`);
    return res.redirect(303, '/login?erro=sso');
  }
  console.info(`[sso] token recebido no campo "${campo}"`);

  try {
    const dados = await validarToken(redirectToken);
    const usuario = criarUsuario(dados);
    const jwt = await assinarSessao(usuario);

    res.cookie(COOKIE_NAME, jwt, { ...cookieOptions, maxAge: config.sessionTtl * 1000 });
    console.info(`[sso] login de ${usuario.email} (${usuario.role})`);
    return res.redirect(303, '/');
  } catch (erro) {
    // Nunca logar o redirectToken nem a API key.
    if (erro instanceof TokenInvalidoError) {
      console.warn(`[sso] token recusado: ${erro.message}`);
    } else {
      console.error(`[sso] falha ao validar token: ${erro.message}`);
    }
    return res.redirect(303, '/login?erro=sso');
  }
}

const rotasSso = ['/auth/sso', '/auth/sso/login_unico'];
router.post(rotasSso, receberSso);
router.get(rotasSso, receberSso);

// --- API usada pelo React --------------------------------------------------
router.get('/api/auth/me', async (req, res) => {
  const usuario = await lerSessao(req.cookies[COOKIE_NAME]);
  if (!usuario) {
    return res.status(401).json({ portalUrl: config.portalUrl });
  }
  return res.json({ user: usuario });
});

router.post('/api/auth/logout', (req, res) => {
  // Proteção contra CSRF: só aceita logout disparado pela própria Intranet.
  if (req.get('origin') !== config.publicOrigin) {
    return res.status(403).json({ erro: 'Origem não permitida' });
  }
  res.clearCookie(COOKIE_NAME, cookieOptions);
  return res.json({ portalUrl: config.portalUrl });
});

export default router;
