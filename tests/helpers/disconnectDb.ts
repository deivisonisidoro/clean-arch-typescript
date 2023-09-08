import { prisma } from './prisma'

export default async () => {
  await prisma.$disconnect()
}
