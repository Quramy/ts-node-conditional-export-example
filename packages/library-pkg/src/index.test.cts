import { awesomeFn } from "./index.cjs";

describe("awesomeFn used from CommonJS", () => {
  it("should not contain URL scheme", () => {
    expect(awesomeFn().indexOf("file://")).toBe(-1);
  });
});
