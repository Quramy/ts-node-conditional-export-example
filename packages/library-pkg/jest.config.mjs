export default {
  extensionsToTreatAsEsm: [".ts", ".mts"],
  transform: {
    "^.+\\.m?ts$": "@quramy/jest"
  },
  testMatch: [
    "**/?(*.)+(spec|test).?([mc])[jt]s",
    "**/?(*.)+(spec|test).[jt]sx"
  ],
  testPathIgnorePatterns: ["/node_modules/", "lib/.*"],
  collectCoverageFrom: ["src/**/*.ts", "!**/testing/**"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.mjs$": "$1.mts",
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
  moduleFileExtensions: ["js", "mjs", "cjs", "mts", "ts", "json"]
};
