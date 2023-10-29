import express from 'express'

import { documentsRoutes } from '../routers/documentation'
import { userRoutes } from '../routers/user'

const app = express()

app.use(express.json())

app.use('/', documentsRoutes)
app.use('/users', userRoutes)

export { app }
