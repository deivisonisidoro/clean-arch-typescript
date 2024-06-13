import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/e2e/**/*.spec.ts', '!tests'],
    threads: false,
    setupFiles: ['tests/helpers/db/setup.ts'],
  },
})
