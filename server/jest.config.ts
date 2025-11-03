import type { Config } from 'jest'

const config: Config = {
  clearMocks: true,
  coverageProvider: 'v8',
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  watchPathIgnorePatterns: ['/build/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/build/'],
  transformIgnorePatterns: ['/node_modules/', '/build/'],
  testEnvironment: 'node',
}

export default config
