# Intranet JUCEPE

Intranet da Junta Comercial de Pernambuco. Frontend em React + Vite e um backend
pequeno (BFF) em Node/Express, responsável pelo login via **Login Único JCP**.

```
navegador ──► nginx ──┬── /auth/*, /api/*  ──► BFF (server/, porta 3001)
                      └── demais rotas     ──► SPA React (dist/)
```

## Login via SSO (Login Único JCP)

A Intranet está cadastrada no Login Único como um sistema de destino do tipo
**TOKEN**. Ela não tem tela de usuário e senha própria.

1. O usuário faz login no portal Login Único e clica no card **Intranet**.
2. O portal gera um `redirect_token` (UUID de uso único, válido por ~30s) e faz
   um POST de formulário, em nova aba, para `{urlDestino do card}/login_unico`.
   Com o card apontando para `https://<intranet>/auth/sso`, o POST chega em
   `/auth/sso/login_unico` com o campo `redirect_token`.
3. O BFF chama `POST /portal/sso/validar-token` do Login Único, enviando o
   header `X-Api-Key` e o body `{ "redirectToken": "<uuid>" }`. A resposta traz
   `{ cpf, nome, email, tipo }`.
4. O BFF gera um JWT (HS256) com os dados do usuário, grava no cookie
   `intranet_session` (HttpOnly, Secure, SameSite=Lax, 8h) e redireciona (303)
   para `/`. Se o token for recusado, redireciona para `/login?erro=sso`.
5. O React consulta `GET /api/auth/me` para saber quem está logado.

O BFF existe porque a `X-Api-Key` é secreta e não pode chegar ao navegador, e
porque o nginx sozinho não consegue receber o POST do portal.

### Rotas do BFF

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/auth/sso/login_unico` | Recebe o `redirect_token` do portal (é para cá que o portal envia) |
| `POST` | `/auth/sso` | Alternativa: aceita `redirect_token` ou `redirectToken`. As duas rotas também aceitam `GET ?redirectToken=` |
| `GET` | `/api/auth/me` | `200 { user }` com sessão válida, ou `401 { portalUrl }` |
| `POST` | `/api/auth/logout` | Confere o header `Origin`, apaga o cookie e devolve `{ portalUrl }` |
| `GET` | `/api/health` | Verificação de saúde |

### Perfis

O CPF retornado pelo `validar-token` só é usado no servidor para definir o
perfil: ele não vai para o cookie nem para o front.

O `validar-token` ainda não devolve o perfil do usuário. Por enquanto, é admin
quem tiver o e-mail ou o CPF na variável `ADMIN_USERS`. Os demais usuários
recebem só permissão de leitura e não acessam `/admin` nem
`/administracao/publicar`.

## Variáveis de ambiente

Ficam em `server/.env`. Use [`server/.env.example`](server/.env.example) como
modelo. **Nunca commite o `.env`.**

| Variável | Obrigatória | Descrição |
|---|---|---|
| `LOGIN_UNICO_API_URL` | sim | URL da API do Login Único, ex.: `https://loginunico.jucepe.pe.gov.br/api` |
| `LOGIN_UNICO_API_KEY` | sim | Chave do sistema `intranet`, enviada no header `X-Api-Key` |
| `LOGIN_UNICO_PORTAL_URL` | sim | Para onde o usuário vai quando não está logado ou faz logout |
| `SESSION_SECRET` | sim | Segredo do JWT da sessão, com no mínimo 32 caracteres |
| `PUBLIC_ORIGIN` | sim | Origem pública da Intranet, ex.: `https://intranet.jucepe.pe.gov.br` (usada no logout) |
| `SESSION_TTL` | não | Validade da sessão em segundos. Padrão: `28800` (8h) |
| `ADMIN_USERS` | não | E-mails ou CPFs (só dígitos) com perfil admin, separados por vírgula |
| `PORT` | não | Porta do BFF. Padrão: `3001` |
| `NODE_EXTRA_CA_CERTS` | não | Caminho de uma CA extra, se o certificado do Login Único não for confiável |

Para gerar um `SESSION_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

## Rodando localmente

Requisito: Node 20.6 ou mais recente.

```bash
# 1. Backend (BFF)
cd server
cp .env.example .env      # preencha os valores
npm install
npm run dev               # http://localhost:3001

# 2. Frontend, em outro terminal, na raiz do projeto
npm install
npm run dev               # http://localhost:5172
```

Em desenvolvimento, o Vite encaminha `/api/` e `/auth/` para
`http://localhost:3001` (veja `vite.config.js`), então o front e o BFF
funcionam na mesma origem, como em produção.

> **Certificado não confiável:** o `--env-file` pode não aplicar o
> `NODE_EXTRA_CA_CERTS`, porque o Node lê essa variável ao iniciar. Se precisar
> dela localmente, defina-a no terminal antes do `npm run dev`.

### Testando o SSO com um token real

1. No Swagger do Login Único, faça `POST /public/auth/token` e clique em
   **Authorize**.
2. Chame `POST /portal/sso/redirect/intranet` e copie o `redirectToken`.
3. Em até 30 segundos:

   ```bash
   curl -i -X POST -d "redirectToken=<uuid>" http://localhost:5172/auth/sso
   ```

   O esperado é `303` com o header `Set-Cookie: intranet_session=...`.
   Reenviar o mesmo token deve dar `303` para `/login?erro=sso`.

## Docker

```bash
docker compose up --build   # http://localhost:5172
```

O compose sobe dois serviços:

- **`intranet`**: nginx servindo a SPA e encaminhando `/auth/` e `/api/` para o BFF.
- **`bff`**: o backend. Lê `server/.env` e não expõe porta, então só o nginx o acessa.

Se o Login Único usar um certificado não confiável, coloque a CA em
`server/certs/`, descomente o volume no `docker-compose.yml` e defina
`NODE_EXTRA_CA_CERTS=/certs/ca.pem` no `server/.env`.

> Em produção, a Intranet precisa estar em **HTTPS**, porque o cookie de sessão
> é `Secure`. Os navegadores só abrem exceção para `localhost`.

## Estrutura

```
server/                 BFF (Node 20 + Express)
  src/index.js          inicialização do Express
  src/config.js         leitura e validação das variáveis de ambiente
  src/loginUnico.js     chamada ao validar-token
  src/session.js        JWT da sessão e definição de perfil
  src/routes/auth.js    rotas /auth/sso e /api/auth/*
src/                    frontend React
  context/AuthContext.jsx   estado de autenticação (user, login, logout, hasPermission)
  pages/auth/Login.jsx      tela com o botão "Entrar pelo Login Único"
```
