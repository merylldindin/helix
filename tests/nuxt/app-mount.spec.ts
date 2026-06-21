import { mountSuspended } from "@nuxt/test-utils/runtime";
import { defineComponent, h } from "vue";
import { describe, expect, it } from "vitest";

const SimpleComponent = defineComponent({
  name: "SimpleComponent",
  setup() {
    return () => h("div", { "data-testid": "smoke" }, "Meryll Dindin");
  },
});

describe("Nuxt runtime smoke test", () => {
  it("mounts a component in the Nuxt environment", async () => {
    const wrapper = await mountSuspended(SimpleComponent);

    expect(wrapper.find("[data-testid='smoke']").exists()).toBe(true);
    expect(wrapper.text()).toContain("Meryll Dindin");
  });
});
