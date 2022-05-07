import { awesomeFn } from "./index.mjs";

describe("awesomeFn used from ESM", () => {
  it("should contain URL scheme", () => {
    expect(awesomeFn().indexOf("file://")).not.toBe(-1);
  });
});
