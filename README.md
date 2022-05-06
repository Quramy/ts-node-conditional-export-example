# ts-node-dual-export-example

An example repository to explain how to build dual-exported npm package with TypeScript.

## :warning: Caveat

First of all, do you really need to publish **Dual-exported** package?

If you need to provide only ESM package, in other words if users of your package can migrate ESM, you don't need to read this repository.
I recommend to Read [Pure ESM package guide](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

This repository may help you if you need to provide your package to both ESM and CommonJS users.

## :wrench: Requirements

This repository relies on TypeScript's [ECMAScript Module Support in Node.js](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7-beta/#esm-nodejs) feature.

## :open_file_folder: Directory structure of the entire repo

This repo uses npm workspaces feature and the directory structure is the following:

```
(repo_root)
├── README.md
├── packages
│   └── dual-exp-pkg  # An example of Node.js library package
└── user-apps
    ├── app-esm       # An example of application package written by pure ESM
    └── app-old       # An example of application package not specified "type" (i.e. will be recognized CommonJS)
```

Here, `packages/dual-exp-pkg` is a main package. Our goal is to configure this package to be applicable from both ESM and CommonJS packages.
And `app-esm` and `app-old` packages are example of users for `packages/dual-exp-pkg`.

## :open_file_folder: Directory structure of dual-exported package

The `dual-exp-package`'s structure is the following:

```
packages/dual-exp-pkg
├── src            # Source directory
│   ├── index.cts
│   ├── index.mts
│   ├── index.ts
│   └── util.ts
├── lib_cjs        # Distribution directory for CommonJS package
│   ├── index.cjs
│   ├── index.d.cts
│   ├── index.js
│   ├── index.d.ts
│   ├── util.js
│   └── util.d.ts
├── lib_esm        # Distribution directory for ESM package
│   ├── index.d.mts
│   ├── index.mjs
│   ├── util.js
│   └── util.d.js
├── README.md
├── package.json
├── tsconfig.cjs.json
├── tsconfig.esm.json
└── tsconfig.json
```

## :package: How to configure dual-exported package

We can configure dual-exported package using [Node.js Conditional exports feature](https://nodejs.org/api/packages.html#conditional-exports).

```json
{
  "name": "@quramy-ts-node-dual-example/dual-exp-pkg",
  "files": ["lib_cjs", "lib_esm"],
  "main": "lib_cjs/index.js",
  "types": "lib_cjs/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./lib_esm/index.d.mts",
        "default": "./lib_esm/index.mjs"
      },
      "require": {
        "types": "./lib_cjs/index.d.cts",
        "default": "./lib_cjs/index.cjs"
      }
    }
  }
}
```

The above means:

- Provide `./lib_esm/index.mjs` file to users that prefer `import "@quramy-ts-node-dual-example/dual-exp-pkg"`
- Provide `./lib_cjs/index.cjs` file to users that prefer `require("@quramy-ts-node-dual-example/dual-exp-pkg")`
- Provide `./lib_cjs/index.js` file to users than use old Node.js (< v12.16.0)

And TypeScript's type declaration files are exported conditionally too:

- Provide `./lib_esm/index.d.mts` file to users that prefer ESM and TypeScript >= 4.7
- Provide `./lib_cjs/index.d.cts` file to users that prefer CommonJS and TypeScript >= 4.7
- Provide `./llb_cjs/index.d.ts` otherwise

## :recycle: How to switch distribution module type

`dual-exp-pkg` has 2 tsconfig json file to output final distribution.

```sh
$ cd packages/dual-exp-pkg
$ npx tsc -p tsconfig.esm.json # Output files to lib_esm directory
```

```sh
$ cd packages/dual-exp-pkg
$ npx tsc -p tsconfig.cjs.json # Output files to lib_cjs directory
```

```js
/* packages/dual-exp-pkg/tsconfig.esm.json */
{
  "compilerOptions": {
    "module": "node16",
    "moduleResolution": "node16",
    "outDir": "lib_esm",
    // skip
  },
  "exclude": ["src/index.ts", "src/index.cts", "lib_esm/**/*", "lib_cjs/**/*"]
}
```

```js
/* packages/dual-exp-pkg/tsconfig.cjs.json */
{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "lib_cjs",
    // skip
  },
  "exclude": ["src/**/*.mts", "lib_esm/**/*", "lib_cjs/**/*"]
}
```

The 2 json files have different `module` properties. `node16` (or `nodenext`) means that you should follow strict ECMAScript Module rules.

For example, the following import declaration statement is valid under `--module commonjs`.

```ts
import * as util from "./util";
```

However, the above statement are recognized as an error under `--module node16` and TypeScript outputs the following diagnostic message.

```
error TS2835: Relative import paths need explicit file extensions in EcmaScript
```

## :memo: Which file extension do we use?

It's simple. `tsc` compiles TypeScript files as the following table:

| TypeScript source file extension | Compiled JavaScript file extension | Generated type declaration file extension |
| :------------------------------- | :--------------------------------- | :---------------------------------------- |
| `.ts`                            | `.js`                              | `d.ts`                                    |
| `.cts`                           | `.cjs`                             | `d.cts`                                   |
| `.mts`                           | `.mjs`                             | `d.mts`                                   |

There are 2 important rules:

1. TypeScript `--module` option never affect the above table. As well as [Node.js determines module type without file content](https://nodejs.org/api/packages.html#determining-module-system), TypeScript determines output JavaScript file extension using only extension of its source file
1. Import specifiers (e.g. `from "./util.js"`) are never transpiled if you configure TypeScript to preserve import statements (e.g. `--module esnext` or `--module node16`)

For instance, let's think source files in my `dual-exp-pkg`.

`.js` files are treated as CommonJS scripts because the `package.json` doesn't have `type` field(It's [Node.js 's determining module system](https://nodejs.org/api/packages.html#determining-module-system)).
So, TypeScript sources in this packages are treated as the following:

- `src/index.ts`: is treated as a CommonJS script
- `src/index.cts`: is treated as a CommonJS script
- `src/index.mts`: is treated as an ESM
- `src/util.ts`: is treated as a CommonJS script

## License

MIT
