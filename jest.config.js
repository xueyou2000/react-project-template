module.exports = {
    preset: "ts-jest",
    setupFilesAfterEnv: ["@testing-library/react/cleanup-after-each"],
    testMatch: ["<rootDir>/tests/**/*.(spec|test).ts?(x)", "**/__tests__/**/*.(spec|test).ts?(x)"],
    moduleNameMapper: {
        "\\.(css|scss)$": "identity-obj-proxy",
        "^.+\\.svg$": "jest-svg-transformer",
        "^@/(.*)": "<rootDir>/src/$1"
        // ...require("jest-module-name-mapper")()
    },
    transform: {
        "^.+\\.js$": "babel-jest",
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/(?!(validate-|xy-|utils-))"]
};
