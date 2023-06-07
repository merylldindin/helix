import {
  HUSTLE_PAGE_CONTENT,
  LANDING_PAGE_CONTENT,
  POLYGON_PAGE_CONTENT,
  PRIVACY_POLICY_CONTENT,
  TERMS_OF_USE_CONTENT,
} from "@/content";
import { RoutePath } from "@/types";

export const ROUTES_CONTENT = {
  [RoutePath.HUSTLE]: HUSTLE_PAGE_CONTENT,
  [RoutePath.LANDING_PAGE]: LANDING_PAGE_CONTENT,
  [RoutePath.POLYGON]: POLYGON_PAGE_CONTENT,
  [RoutePath.PRIVACY_POLICY]: PRIVACY_POLICY_CONTENT,
  [RoutePath.TERMS_OF_USE]: TERMS_OF_USE_CONTENT,
};
