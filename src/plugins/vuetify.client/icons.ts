import {
  mdiBrain,
  mdiCamera,
  mdiCookieCheck,
  mdiFacebook,
  mdiFactory,
  mdiGithub,
  mdiGoogleMyBusiness,
  mdiHomeCircleOutline,
  mdiInstagram,
  mdiLinkedin,
  mdiNotebook,
  mdiTwitter,
} from "@mdi/js";

import { IconName } from "@/types";

export const ICONS: Record<IconName, string> = {
  [IconName.BRAIN]: mdiBrain,
  [IconName.CAMERA]: mdiCamera,
  [IconName.COOKIE_CHECK]: mdiCookieCheck,
  [IconName.FACEBOOK]: mdiFacebook,
  [IconName.FACTORY]: mdiFactory,
  [IconName.GITHUB]: mdiGithub,
  [IconName.GOOGLE_MY_BUSINESS]: mdiGoogleMyBusiness,
  [IconName.HOME_CIRCLE_OUTLINE]: mdiHomeCircleOutline,
  [IconName.INSTAGRAM]: mdiInstagram,
  [IconName.LINKEDIN]: mdiLinkedin,
  [IconName.NOTEBOOK]: mdiNotebook,
  [IconName.TWITTER]: mdiTwitter,
};
