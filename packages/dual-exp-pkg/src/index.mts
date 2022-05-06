import * as util from "./util.js";

export function awesomeFn() {
  const file = import.meta.url;
  return util.fn(file);
}
