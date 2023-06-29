import { DEFAULT_URL } from "@/content";
import { ComponentName } from "@/types";

enum ItemListConfig {
  ROTATING_CUBE = "ROTATING_CUBE",
  SECTION_IMAGE = "SECTION_IMAGE",
}

const getRotatingCubeItemList = (content: any): unknown => {
  const pageUrl = `${DEFAULT_URL}${content.head.canonical}`;

  const links: string[] = [];

  content.components
    .filter((item: any) => item.name === ComponentName.ROTATING_CUBE)
    .forEach((component: any) =>
      component.props.pages.forEach((page: any) => {
        if (page.headline.to) {
          links.push(`${DEFAULT_URL}${page.headline.to}`);
        }

        page.profiles.forEach((profile: any) => {
          links.push(
            profile.link.external ? profile.link.to : `${DEFAULT_URL}${profile.link.to}`
          );
        });
      })
    );

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: links.map((link, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: link,
    })),
    numberOfItems: links.length,
    url: pageUrl,
  };
};

const getSectionImageItemList = (content: any): unknown => {
  const pageUrl = `${DEFAULT_URL}${content.head.canonical}`;

  const sections = content.components.filter(
    (item: any) => item.name === ComponentName.SECTION_IMAGE
  ) as any[];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: sections.map((section, index) => {
      const url = section.props.content.slice(-1)[0].prop.to;

      return {
        "@type": "ListItem",
        position: index + 1,
        url: url.startsWith("http") ? url : `${DEFAULT_URL}${url}`,
      };
    }),
    numberOfItems: sections.length,
    url: pageUrl,
  };
};

export const getItemListSchema = (content: any): unknown => {
  if (content.schema.prop.source === ItemListConfig.ROTATING_CUBE) {
    return getRotatingCubeItemList(content);
  }
  if (content.schema.prop.source === ItemListConfig.SECTION_IMAGE) {
    return getSectionImageItemList(content);
  }

  const pageUrl = `${DEFAULT_URL}${content.head.canonical}`;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: 0,
    url: pageUrl,
  };
};
