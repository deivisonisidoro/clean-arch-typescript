import { prisma } from './prisma'

export default async () => {
  await prisma.$transaction([prisma.user.deleteMany()])
}
