/**
 * Function to clear database tables using Prisma transactions.
 * @function
 * @name clearDatabase
 * @description This function performs a Prisma transaction to delete all records from the 'refreshToken' and 'user' tables.
 */
import { prisma } from './prisma'

export default async () => {
  await prisma.$transaction([
    prisma.refreshToken.deleteMany(),
    prisma.user.deleteMany(),
  ])
}
