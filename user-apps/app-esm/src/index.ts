import { awesomeFn } from "@quramy-ts-node-dual-example/dual-exp-pkg";

// @ts-expect-errors `legacyFn` does not exported to ESM user. It can be used from only non-ESM packages.
import { legacyFn } from "@quramy-ts-node-dual-example/dual-exp-pkg";

function main() {
  console.log("");
  console.log("APP ESM:");
  console.log(awesomeFn());
}

main();
