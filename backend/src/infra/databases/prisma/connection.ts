import { PrismaClient } from '@prisma/client'

/**
 * Prisma client instance for interacting with the database.
 *
 * @constant
 * @type {PrismaClient}
 */
const prismaClient: PrismaClient = new PrismaClient()

export { prismaClient }
