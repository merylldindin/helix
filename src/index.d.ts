import { ColorName } from "@/plugins/vuetify.client/colors";
import { IconName } from "@/plugins/vuetify.client/icons";

declare module "#app" {
  interface NuxtApp {
    $COLOR: ColorName;
    $ICON: Record<IconName, string>;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $COLOR: ColorName;
    $ICON: Record<IconName, string>;
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $COLOR: ColorName;
    $ICON: Record<IconName, string>;
  }
}

export {};
