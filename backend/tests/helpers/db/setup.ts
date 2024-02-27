/**
 * Setup and teardown functions for database operations using Vitest.
 * @module databaseTests
 */

import { afterAll, afterEach, beforeEach, beforeAll } from 'vitest'

import connectDb from './connectDb'
import disconnectDb from './disconnectDb'
import resetDb from './resetDb'

/**
 * Function to perform setup operations before all tests.
 * @function
 * @name beforeAllTests
 * @description This function resets the database before all tests are executed.
 */
beforeAll(async () => {
  await resetDb()
})

/**
 * Function to perform setup operations before each test.
 * @function
 * @name beforeEachTest
 * @description This function connects to the database before each test is executed.
 */
beforeEach(async () => {
  await connectDb()
})

/**
 * Function to perform cleanup operations after each test.
 * @function
 * @name afterEachTest
 * @description This function resets the database after each test is executed.
 */
afterEach(async () => {
  await resetDb()
})

/**
 * Function to perform cleanup operations after all tests.
 * @function
 * @name afterAllTests
 * @description This function disconnects from the database after all tests are executed.
 */
afterAll(async () => {
  await disconnectDb()
})
