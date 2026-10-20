import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from './config.js';
import authRoutes from './routes/auth.js';

const app = express();

// Estamos atrás do nginx: confia nos headers X-Forwarded-* do primeiro proxy.
app.set('trust proxy', 1);
app.disable('x-powered-by');

app.use(express.urlencoded({ extended: false, limit: '10kb' })); // POST de formulário do portal
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Log simples de acesso. Usa req.path (sem query string) para não vazar o
// redirectToken quando ele chega via GET.
app.use((req, res, next) => {
  res.on('finish', () => console.info(`${req.method} ${req.path} ${res.statusCode}`));
  next();
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use(authRoutes);

app.use((req, res) => res.status(404).json({ erro: 'Não encontrado' }));

app.listen(config.port, () => {
  console.info(`[bff] ouvindo na porta ${config.port}`);
});
