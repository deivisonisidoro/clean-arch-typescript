import express from 'express'
import { userRoutes } from '../routers/user'

const app = express()

app.use(express.json())

app.use('/users', userRoutes)

export { app }
