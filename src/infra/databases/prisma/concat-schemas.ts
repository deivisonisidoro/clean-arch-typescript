import { appendFile, readFile, writeFile } from 'fs/promises'
import { glob } from 'glob'

const start = async () => {
  const schemaFile = 'src/infra/database/prisma/schema.prisma'
  const connectFile = 'src/infra/database/prisma/connect-db.prisma'
  const models = await glob('src/infra/database/prisma/models/*.prisma')
  const files = [connectFile, ...models]

  await writeFile(schemaFile, '')

  await Promise.all(
    files.map(async (path) => {
      const content = await readFile(path)
      return appendFile(schemaFile, content.toString())
    }),
  )
}
start()
