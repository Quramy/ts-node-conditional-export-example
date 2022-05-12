import { awesomeFn } from "./index.cjs";

const minusOne: number = -1;

describe("awesomeFn used from CommonJS", () => {
  it("should not contain URL scheme", () => {
    expect(awesomeFn().indexOf("file://")).toBe(minusOne);
  });
});
