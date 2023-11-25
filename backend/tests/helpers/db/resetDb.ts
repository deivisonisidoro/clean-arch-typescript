import { prisma } from './prisma'

export default async () => {
  await prisma.$transaction([
    prisma.refreshToken.deleteMany(),
    prisma.user.deleteMany(),
  ])
}
