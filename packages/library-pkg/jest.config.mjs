const swcrc = {
  jsc: {
    parser: {
      syntax: "typescript"
    },
    target: "es2020"
    // Other compiler options
  }
};

export default {
  // - .mjs files are always treated as ESM by Jest default.
  // - In this package, *.js should NOT be treated as ESM.
  extensionsToTreatAsEsm: [".mts"],

  // Transpile TypeScript sources (.ts, .cts, .mts)
  transform: {
    // Transpile .mts as Native ESM
    "^.+\\.mts$": [
      "@swc/jest",
      {
        ...swcrc,
        module: {
          type: "es6",
          strict: true,
          scrictMode: false,
          noInterop: true,
          ignoreDynamic: true
        }
      }
    ],
    // Transpile .ts or .cts as CommonJS
    "^.+\\.c?ts$": [
      "@swc/jest",
      {
        ...swcrc,
        module: {
          type: "commonjs",
          ignoreDynamic: true
        }
      }
    ]
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
