import {
  mdiBrain,
  mdiCamera,
  mdiCookieCheck,
  mdiFacebook,
  mdiFactory,
  mdiGithub,
  mdiGoogleMyBusiness,
  mdiInstagram,
  mdiLinkedin,
  mdiNotebook,
  mdiTwitter,
} from "@mdi/js";

export enum IconName {
  BRAIN = "BRAIN",
  CAMERA = "CAMERA",
  COOKIE_CHECK = "COOKIE_CHECK",
  FACEBOOK = "FACEBOOK",
  FACTORY = "FACTORY",
  GITHUB = "GITHUB",
  GOOGLE_MY_BUSINESS = "GOOGLE_MY_BUSINESS",
  INSTAGRAM = "INSTAGRAM",
  LINKEDIN = "LINKEDIN",
  NOTEBOOK = "NOTEBOOK",
  TWITTER = "TWITTER",
}

export const CustomIcons: Record<IconName, string> = {
  [IconName.BRAIN]: mdiBrain,
  [IconName.CAMERA]: mdiCamera,
  [IconName.COOKIE_CHECK]: mdiCookieCheck,
  [IconName.FACEBOOK]: mdiFacebook,
  [IconName.FACTORY]: mdiFactory,
  [IconName.GITHUB]: mdiGithub,
  [IconName.GOOGLE_MY_BUSINESS]: mdiGoogleMyBusiness,
  [IconName.INSTAGRAM]: mdiInstagram,
  [IconName.LINKEDIN]: mdiLinkedin,
  [IconName.NOTEBOOK]: mdiNotebook,
  [IconName.TWITTER]: mdiTwitter,
};
