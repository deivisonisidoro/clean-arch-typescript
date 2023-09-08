import connectDb from './connectDb'
import disconnectDb from './disconnectDb'
import resetDb from './resetDb'
import { afterAll, afterEach, beforeEach } from 'vitest'

beforeEach(async () => {
  await connectDb()
})
afterEach(async () => {
  await resetDb()
})
afterAll(async () => {
  await disconnectDb()
})
