import INDEX_CONTENT from "./pages/index.json";
import LEGAL_PRIVACY_POLICY_CONTENT from "./pages/legal/privacy-policy.json";
import LEGAL_TERMS_OF_USE_CONTENT from "./pages/legal/terms-of-use.json";

export const PAGE_CONTENT = {
  index: INDEX_CONTENT,
  legal: {
    privacyPolicy: LEGAL_PRIVACY_POLICY_CONTENT,
    termsOfUse: LEGAL_TERMS_OF_USE_CONTENT,
  },
};

export { default as LAYOUT_CONTENT } from "./layout.json";

export { CUSTOM_ERROR_HEAD, CUSTOM_HEAD } from "./meta";
