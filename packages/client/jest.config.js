const dotenv = require('dotenv')

dotenv.config()

const setupDir = '<rootDir>/jest'

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
    globals: {
        __SERVER_PORT__: process.env.SERVER_PORT,
        __SERVER_URL__: process.env.SERVER_URL,
        __EXTERNAL_SERVER_PATH__: process.env.EXTERNAL_SERVER_PATH,
        __NODE_ENV__: true,
    },
    setupFiles: [`${setupDir}/jest.polyfills.js`, `${setupDir}/jest.setup.js`],
    testEnvironmentOptions: {
        customExportConditions: [''],
    },
    moduleNameMapper: {
        '\\.module.(css)$': 'jest-css-modules',
        '\\.(css)$': `${setupDir}/__mocks__/css.mock.js`,
        '\\.(svg|svg.*)$': `${setupDir}/__mocks__/svg.mock.js`,
        '\\.(png|jpg.*)$': `${setupDir}/__mocks__/img.mock.js`,
        '^@assets(.*)$': '<rootDir>/src/assets$1',
        '^@components(.*)$': '<rootDir>/src/components$1',
        '^@pages(.*)$': '<rootDir>/src/pages$1',
        '^@utils(.*)$': '<rootDir>/src/utils$1',
        '^@types(.*)$': '<rootDir>/src/types$1',
        '^@routes(.*)$': '<rootDir>/src/routes$1',
        '^@store(.*)$': '<rootDir>/src/store$1',
        '^@styles(.*)$': '<rootDir>/src/styles$1',
        '^@api(.*)$': '<rootDir>/src/api$1',
        '^@game-core(.*)$': '<rootDir>/src/game-core$1',
        '^@services(.*)$': '<rootDir>/src/services$1',
    },
}
