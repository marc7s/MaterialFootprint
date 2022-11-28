/** @type {import('ts-jest').JestConfigWithTsJest} */
import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest';
import tsconfig from './tsconfig.json';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
  modulePaths: [tsconfig.compilerOptions.baseUrl],
  moduleNameMapper: {
    '../api/(.*)': '<rootDir>/$1'
  }
};

export default config;