import { DEFAULT_URL } from "@/content";
import type { GenericContent, ReferenceItem, TimelineContent } from "@/types";
import { ComponentName, ContentType } from "@/types";

enum ItemListConfig {
  IMAGE_SECTION = "IMAGE_SECTION",
  LINKS_SECTION = "LINKS_SECTION",
  ROTATING_CUBE = "ROTATING_CUBE",
  TIMELINE_SECTION = "TIMELINE_SECTION",
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
    (item: any) => item.name === ComponentName.IMAGE_SECTION
  ) as any[];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: sections.map((section, index) => {
      const url = section.props.content.at(-1).prop.to;

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

const getSectionTimelineItemList = (content: any): unknown => {
  const pageUrl = `${DEFAULT_URL}${content.head.canonical}`;

  const section = content.components.find(
    (item: any) => item.name === ComponentName.TIMELINE_SECTION
  );

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: (section.props.timeline as TimelineContent[]).map(
      (link, index) => {
        return {
          "@type": "ListItem",
          position: index + 1,
          url: link.href,
        };
      }
    ),
    numberOfItems: section.props.timeline.length,
    url: pageUrl,
  };
};

const getSectionReferenceItemList = (content: any): unknown => {
  const pageUrl = `${DEFAULT_URL}${content.head.canonical}`;

  const section = content.components.find(
    (item: any) => item.name === ComponentName.LINKS_SECTION
  );

  const links = (section.props.content as GenericContent[])
    .filter((link) => link.type === ContentType.REFERENCE)
    .map((link, index) => {
      return {
        "@type": "ListItem",
        position: index + 1,
        url: (link.prop as ReferenceItem).href,
      };
    });

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: links,
    numberOfItems: links.length,
    url: pageUrl,
  };
};

export const getItemListSchema = (content: any): unknown => {
  if (content.schema.prop.source === ItemListConfig.ROTATING_CUBE) {
    return getRotatingCubeItemList(content);
  }

  if (content.schema.prop.source === ItemListConfig.IMAGE_SECTION) {
    return getSectionImageItemList(content);
  }

  if (content.schema.prop.source === ItemListConfig.LINKS_SECTION) {
    return getSectionReferenceItemList(content);
  }

  if (content.schema.prop.source === ItemListConfig.TIMELINE_SECTION) {
    return getSectionTimelineItemList(content);
  }

  const pageUrl = `${DEFAULT_URL}${content.head.canonical}`;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: 0,
    url: pageUrl,
  };
};
