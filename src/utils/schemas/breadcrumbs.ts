import { DEFAULT_TITLE, DEFAULT_URL } from "@/content";

const getBreadcrumbsItems = (route: string): { name: string; url: string }[] => {
  const breadcrumbs = [{ name: DEFAULT_TITLE, url: DEFAULT_URL }];
  const subpaths = route.split("/").filter(Boolean);

  let path = "";

  for (const subpath of subpaths) {
    const words = subpath.split("-");

    const title = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    path += `/${subpath}`;

    breadcrumbs.push({ name: title, url: `${DEFAULT_URL}${path}/` });
  }

  return breadcrumbs;
};

export const getBreadcrumbsSchema = (route: string) => {
  const breadcrumbs = getBreadcrumbsItems(route);

  return {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      item: {
        "@id": item.url,
        name: item.name,
      },
      position: index + 1,
    })),
  };
};
