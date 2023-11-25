import express from 'express';
import cors from 'cors';
import { documentsRoutes } from '../routers/documentation';
import { userRoutes } from '../routers/user';
import { authenticateRoutes } from '../routers/authenticate'

const app = express();

// Configuração para permitir todas as origens
const corsOptions: cors.CorsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/', documentsRoutes);
app.use('/users', userRoutes);
app.use('/authenticate', authenticateRoutes);

export { app };
