import { afterAll, afterEach, beforeEach, beforeAll } from 'vitest'

import connectDb from './connectDb'
import disconnectDb from './disconnectDb'
import resetDb from './resetDb'

beforeAll(async () =>{
  await resetDb()
})
beforeEach(async () => {
  await connectDb()
})
afterEach(async () => {
  await resetDb()
})
afterAll(async () => {
  await disconnectDb()
})
