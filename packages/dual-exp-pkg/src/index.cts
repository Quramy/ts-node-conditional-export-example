import { fn } from "./util";

export function awesomeFn() {
  return fn(__filename);
}

export function legacyFn() {
  return "legacy";
}
