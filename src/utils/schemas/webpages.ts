import { DEFAULT_NAME, DEFAULT_URL } from "@/content";
import { findLast} from "lodash";

export const getWebPageSchema = (route: string): Object => {
  const pageUrl = `${DEFAULT_URL}${route}`;

  const subpath = findLast(route.split("/"), Boolean) || "";

  const pageName = subpath
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return {
    "@context": "https://schema.org",
    "@id": pageUrl,
    "@type": "WebPage",
    name: pageName.length > 0 ? pageName : DEFAULT_NAME,
    url: pageUrl,
  };
};
