import { prisma } from './prisma'

/**
 * Function to connect to the Prisma database.
 * @returns A promise that resolves when the connection is established.
 */
export default async () => {
  await prisma.$connect()
}
