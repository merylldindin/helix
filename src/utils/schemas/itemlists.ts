import { DEFAULT_URL } from "@/content";
import { ComponentName } from "@/types";

enum ItemListConfig {
  SECTIONS = "sections",
}

const getSectionItemList = (content: any): unknown => {
  const pageUrl = `${DEFAULT_URL}${content.head.canonical}`;

  const sections = content.components.filter(
    (item: any) => item.name === ComponentName.SECTION_IMAGE
  ) as any[];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: sections.map((section, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${DEFAULT_URL}${section.props.content.slice(-1)[0].prop.to}`,
    })),
    numberOfItems: sections.length,
    url: pageUrl,
  };
};

export const getItemListSchema = (content: any): unknown => {
  if (content.schema.prop.source === ItemListConfig.SECTIONS) {
    return getSectionItemList(content);
  }

  const pageUrl = `${DEFAULT_URL}${content.head.canonical}`;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: 0,
    url: pageUrl,
  };
};
