import { mdiPencil } from "@mdi/js";

enum IconName {
  PENCIL = "PENCIL",
}

export const CustomIcons: Record<IconName, string> = {
  [IconName.PENCIL]: mdiPencil,
};
