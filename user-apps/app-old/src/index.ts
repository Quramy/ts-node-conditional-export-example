import { awesomeFn, legacyFn } from "@quramy-ts-node-dual-example/dual-exp-pkg";

function main() {
  legacyFn();

  console.log("");
  console.log("APP OLD:");
  console.log(awesomeFn());
}

main();
