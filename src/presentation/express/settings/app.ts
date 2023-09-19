import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../docs/swagger.json'
import { userRoutes } from '../routers/user'
import { documentsRoutes } from '../routers/documentation'

const app = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json())

app.use('/', documentsRoutes)
app.use('/users', userRoutes)

export { app }
