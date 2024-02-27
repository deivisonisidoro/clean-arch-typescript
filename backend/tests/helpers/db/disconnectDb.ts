import { prisma } from './prisma'

/**
 * Function to disconnect from the Prisma database.
 * @returns A promise that resolves when the disconnection is completed.
 */
export default async () => {
  await prisma.$disconnect()
}
