import { describe, expect, it } from "vitest";

import { isExternalUrl } from "../../app/utils/links";

describe("isExternalUrl", () => {
  it("detects absolute http and https urls as external", () => {
    expect(isExternalUrl("https://merylldindin.com")).toBe(true);
    expect(isExternalUrl("http://example.com")).toBe(true);
  });

  it("detects non-http schemes as external", () => {
    expect(isExternalUrl("mailto:hello@merylldindin.com")).toBe(true);
    expect(isExternalUrl("tel:+33123456789")).toBe(true);
  });

  it("treats internal paths as not external", () => {
    expect(isExternalUrl("/ventures/")).toBe(false);
    expect(isExternalUrl("thoughts/")).toBe(false);
    expect(isExternalUrl("#section")).toBe(false);
  });
});
