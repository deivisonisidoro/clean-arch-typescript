import express from 'express'
import cors from 'cors';

import { documentsRoutes } from '../routers/documentation'
import { userRoutes } from '../routers/user'

const app = express()

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));

app.use(express.json())

app.use('/', documentsRoutes)
app.use('/users', userRoutes)

export { app }
