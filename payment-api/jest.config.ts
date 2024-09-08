import { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: [
        '/node_modules/',
        'out/'
    ],
    moduleNameMapper: {
        '@src/(.*)': '<rootDir>/src/$1',
        '@core/(.*)': '<rootDir>/src/core/$1',
        '@infra/(.*)': '<rootDir>/src/infra/$1',
        '@shared/(.*)': '<rootDir>/src/shared/$1'
    }
};

export default config;