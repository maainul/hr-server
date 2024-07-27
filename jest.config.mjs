// jest.config.mjs
export default {
    "testTimeout": 20000,
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'json', 'node'],
};
