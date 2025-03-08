declare module "*.vue" {
  import "vuetify";
  import type { DefineComponent } from "vue";

  const component: DefineComponent<object, object, any>;

  export default component;
}
