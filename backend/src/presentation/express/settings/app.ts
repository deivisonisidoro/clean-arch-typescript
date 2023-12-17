import express from 'express';
import cors from 'cors';
import { documentsRoutes } from '../routers/documentation';
import { userRoutes } from '../routers/user';
import { authenticateRoutes } from '../routers/authenticate';

/**
 * Express application instance.
 */
const app = express();

/**
 * CORS options for allowing all origins.
 */
const corsOptions: cors.CorsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.use(express.json());

/**
 * Mounting routes for documentation, user-related, and authentication endpoints.
 */
app.use('/', documentsRoutes);
app.use('/users', userRoutes);
app.use('/authenticate', authenticateRoutes);

export { app };
