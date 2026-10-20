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
// O portal faz um POST de formulário para cá. O GET existe como alternativa.
// O nome do campo ainda precisa ser confirmado com o time do Login Único,
// por isso aceitamos as duas grafias.
async function receberSso(req, res) {
  const origem = { ...req.query, ...req.body };
  const redirectToken = origem.redirectToken || origem.redirect_token;

  if (!redirectToken || typeof redirectToken !== 'string') {
    return res.redirect(303, '/login?erro=sso');
  }

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

router.post('/auth/sso', receberSso);
router.get('/auth/sso', receberSso);

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
