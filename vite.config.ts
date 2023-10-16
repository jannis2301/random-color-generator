import { defineConfig } from 'vite'

export default defineConfig({
  base: '/random-color-generator/',
  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'istanbul',
      reporter: ['clover', 'html'],
      reportsDirectory: 'target/clover',
    },
    reporters: ['junit', 'default'],
    outputFile: './target/surefire-reports/junit.xml',
  },
})
