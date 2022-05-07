import { awesomeFn, legacyFn } from "@quramy/library-pkg";

function main() {
  legacyFn();

  console.log("");
  console.log("APP OLD:");
  console.log(awesomeFn());
}

main();
