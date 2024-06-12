import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/unity/**/*.spec.ts', '!tests'],
  },
})
