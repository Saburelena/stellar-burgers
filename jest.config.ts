import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@ui(.*)$': '<rootDir>/src/components/ui$1',
    '^@ui-pages(.*)$': '<rootDir>/src/components/ui/pages$1',
    '^@utils-types(.*)$': '<rootDir>/src/utils/types$1',
    '^@api$': '<rootDir>/src/utils/burger-api.ts',
    '^@slices(.*)$': '<rootDir>/src/services/slices$1',
    '^@selectors(.*)$': '<rootDir>/src/services/selectors$1',
    '\\.(css|less|scss|sass)$': 'jest-css-modules-transform',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.ts'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']
};

export default config;
