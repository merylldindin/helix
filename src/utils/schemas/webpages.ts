import { DEFAULT_NAME, DEFAULT_URL } from "@/content";
import type { PageContent } from "@/types";
import findLast from "lodash/findLast";

export const getWebPageSchema = (route: string, content?: PageContent): object => {
  const pageUrl = `${DEFAULT_URL}${route}`;

  const subpath = findLast(route.split("/"), Boolean) || "";

  const pageName = subpath
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  // Determine the page type based on schema configuration
  const schemaType = content?.schema?.type;
  let pageType = "WebPage";
  if (schemaType === "aboutPage") {
    pageType = "AboutPage";
  }

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@id": pageUrl,
    "@type": pageType,
    about: { "@id": `${DEFAULT_URL}#identity` },
    description: content?.head?.description,
    inLanguage: "en-US",
    isPartOf: { "@id": `${DEFAULT_URL}#website` },
    name: pageName.length > 0 ? pageName : DEFAULT_NAME,
    url: pageUrl,
  };

  // Add additionalType for special page types (TermsOfService, PrivacyPolicy)
  if (content?.schema?.prop?.additionalType) {
    schema.additionalType = `https://schema.org/${content.schema.prop.additionalType}`;
  }

  return schema;
};
