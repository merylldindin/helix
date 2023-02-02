import { mdiCookieCheck } from "@mdi/js";

enum IconName {
  COOKIE_CHECK = "COOKIE_CHECK",
}

export const CustomIcons: Record<IconName, string> = {
  [IconName.COOKIE_CHECK]: mdiCookieCheck,
};
