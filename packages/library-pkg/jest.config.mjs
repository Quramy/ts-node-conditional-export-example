export default {
  // - .mjs files are always treated as ESM by Jest default.
  // - In this package, *.js should NOT be treated as ESM.
  extensionsToTreatAsEsm: [".mts"],

  // Transpile TypeScript sources (.ts, .cts, .mts)
  transform: {
    // TODO
    // This transformer is not for produciton usecase.
    // It should be replaced others (e.g. swc or ts-jest or...) after TS4.7 released
    "^.+\\.[mc]?ts$": "@quramy/jest"
  },

  // To let Jest resolve relative import spcificers like `import "./util.mjs"`,
  // look up corresponding TS source such as "./util.mts" .
  moduleNameMapper: {
    "^(\\.\\.?/.*)\\.mjs$": ["$1.mts", "$1.mjs"],
    "^(\\.\\.?/.*)\\.cjs$": ["$1.cts", "$1.cjs"],
    "^(\\.\\.?/.*)\\.js$": ["$1.ts", "$1.js"]
  },

  moduleFileExtensions: ["mts", "cts", "ts", "mjs", "cjs", "js", "json"],

  testMatch: ["**/?(*.)+(spec|test).?([mc])[jt]s"],
  testPathIgnorePatterns: ["/node_modules/", "<rootDir>/lib/"],
  collectCoverageFrom: ["src/**/*.?([mc])ts", "!src/**/*.test.*"]
};
