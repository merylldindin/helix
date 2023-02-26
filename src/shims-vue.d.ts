declare module "*.vue" {
  import "vuetify";

  import type { DefineComponent } from "vue";

  const component: DefineComponent<{}, {}, any>;

  export default component;
}
