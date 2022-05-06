export default {
  extensionsToTreatAsEsm: [".ts", ".mts"],
  globals: {
    "ts-jest": {
      useESM: true,
      diagnostics: false
    }
  },
  transform: {
    "^.+\\.m?ts$": "ts-jest"
  },
  testMatch: [
    "**/?(*.)+(spec|test).?([mc])[jt]s",
    "**/?(*.)+(spec|test).[jt]sx"
  ],
  testPathIgnorePatterns: ["/node_modules/", "lib_cjs/.*", "lib_esm/.*"],
  collectCoverageFrom: ["src/**/*.ts", "!**/testing/**"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.mjs$": "$1.mts",
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
  moduleFileExtensions: ["js", "mjs", "cjs", "mts", "ts", "json"]
};
