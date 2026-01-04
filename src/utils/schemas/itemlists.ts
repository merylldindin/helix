import { DEFAULT_URL } from "@/content";
import type {
  GenericContent,
  PageContent,
  ReferenceItem,
  TimelineContent,
} from "@/types";
import { ComponentName, ContentType } from "@/types";

enum ItemListConfig {
  IMAGE_SECTION = "IMAGE_SECTION",
  LINKS_SECTION = "LINKS_SECTION",
  ROTATING_CUBE = "ROTATING_CUBE",
  TIMELINE_SECTION = "TIMELINE_SECTION",
}

interface ListItemData {
  name?: string;
  url: string;
}

interface RotatingCubeProfile {
  link: { external?: boolean; to: string };
  slug: string;
}

interface RotatingCubePage {
  headline: { prompt: string; to?: string };
  profiles: RotatingCubeProfile[];
}

interface RotatingCubeProps {
  pages: RotatingCubePage[];
}

interface ImageSectionProps {
  content: GenericContent[];
}

interface TimelineSectionProps {
  timeline: TimelineContent[];
}

interface LinksSectionProps {
  content: GenericContent[];
}

const getRotatingCubeItemList = (content: PageContent): unknown => {
  const pageUrl = `${DEFAULT_URL}${content.head.canonical}`;

  const items: ListItemData[] = [];

  content.components
    .filter((item) => item.name === ComponentName.ROTATING_CUBE)
    .forEach((component) => {
      const props = component.props as unknown as RotatingCubeProps;
      props.pages.forEach((page: RotatingCubePage) => {
        if (page.headline.to) {
          items.push({
            name: page.headline.prompt,
            url: `${DEFAULT_URL}${page.headline.to}`,
          });
        }

        page.profiles.forEach((profile: RotatingCubeProfile) => {
          items.push({
            name: profile.slug,
            url: profile.link.external ? profile.link.to : `${DEFAULT_URL}${profile.link.to}`,
          });
        });
      });
    });

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      name: item.name,
      position: index + 1,
      url: item.url,
    })),
    numberOfItems: items.length,
    url: pageUrl,
  };
};

const getSectionImageItemList = (content: PageContent): unknown => {
  const pageUrl = `${DEFAULT_URL}${content.head.canonical}`;

  const sections = content.components.filter(
    (item) => item.name === ComponentName.IMAGE_SECTION
  );

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: sections.map((section, index) => {
      const props = section.props as unknown as ImageSectionProps;
      const lastItem = props.content.at(-1);
      const url = (lastItem?.prop as { to?: string })?.to ?? "";
      const headline = props.content.find((c) => c.type === ContentType.HEADLINE);

      return {
        "@type": "ListItem",
        name: (headline?.prop as { text?: string })?.text,
        position: index + 1,
        url: url.startsWith("http") ? url : `${DEFAULT_URL}${url}`,
      };
    }),
    numberOfItems: sections.length,
    url: pageUrl,
  };
};

const getSectionTimelineItemList = (content: PageContent): unknown => {
  const pageUrl = `${DEFAULT_URL}${content.head.canonical}`;

  const section = content.components.find(
    (item) => item.name === ComponentName.TIMELINE_SECTION
  );

  const props = section?.props as unknown as TimelineSectionProps;
  const timeline = props?.timeline ?? [];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: timeline.map((link, index) => {
      return {
        "@type": "ListItem",
        name: link.name,
        position: index + 1,
        url: link.href,
      };
    }),
    numberOfItems: timeline.length,
    url: pageUrl,
  };
};

const getSectionReferenceItemList = (content: PageContent): unknown => {
  const pageUrl = `${DEFAULT_URL}${content.head.canonical}`;

  const section = content.components.find(
    (item) => item.name === ComponentName.LINKS_SECTION
  );

  const props = section?.props as unknown as LinksSectionProps;
  const sectionContent = props?.content ?? [];

  const links = sectionContent
    .filter((link) => link.type === ContentType.REFERENCE)
    .map((link, index) => {
      const reference = link.prop as ReferenceItem;
      return {
        "@type": "ListItem",
        name: reference.text,
        position: index + 1,
        url: reference.href,
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

export const getItemListSchema = (content: PageContent): unknown => {
  const source = content.schema?.prop?.source;

  if (source === ItemListConfig.ROTATING_CUBE) {
    return getRotatingCubeItemList(content);
  }

  if (source === ItemListConfig.IMAGE_SECTION) {
    return getSectionImageItemList(content);
  }

  if (source === ItemListConfig.LINKS_SECTION) {
    return getSectionReferenceItemList(content);
  }

  if (source === ItemListConfig.TIMELINE_SECTION) {
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
