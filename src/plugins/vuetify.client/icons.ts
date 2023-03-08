import {
  mdiBrain,
  mdiCamera,
  mdiCookieCheck,
  mdiFacebook,
  mdiFactory,
  mdiFoodCroissant,
  mdiGithub,
  mdiInstagram,
  mdiLinkedin,
  mdiNotebook,
  mdiSchool,
  mdiSilverwareForkKnife,
  mdiTwitter,
} from "@mdi/js";

import { IconName } from "@/types";

export const ICONS: Record<IconName, string> = {
  [IconName.BRAIN]: mdiBrain,
  [IconName.CAMERA]: mdiCamera,
  [IconName.COOKIE_CHECK]: mdiCookieCheck,
  [IconName.FACEBOOK]: mdiFacebook,
  [IconName.FACTORY]: mdiFactory,
  [IconName.FOOD_CROISSANT]: mdiFoodCroissant,
  [IconName.GITHUB]: mdiGithub,
  [IconName.INSTAGRAM]: mdiInstagram,
  [IconName.LINKEDIN]: mdiLinkedin,
  [IconName.NOTEBOOK]: mdiNotebook,
  [IconName.SCHOOL]: mdiSchool,
  [IconName.SILVERWARE_FORK_KNIFE]: mdiSilverwareForkKnife,
  [IconName.TWITTER]: mdiTwitter,
};
