import { awesomeFn } from "./index.mjs";

const minusOne: number = -1;

describe("awesomeFn used from ESM", () => {
  it("should contain URL scheme", () => {
    expect(awesomeFn().indexOf("file://")).not.toBe(minusOne);
  });
});
