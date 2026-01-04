import type { MetaFlatInput } from "unhead/types";

import { DEFAULT_URL } from "@/content";

export type HeadContent = {
  canonical?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  noindex?: boolean;
};

const setMetaCanonical = (canonical: string) => ({
  canonical: `${DEFAULT_URL}${canonical}`,
  ogUrl: `${DEFAULT_URL}${canonical}`,
});

const setMetaTitle = (title: string) => ({
  ogTitle: title,
  title,
  twitterTitle: title,
});

const setMetaDescription = (description: string) => ({
  description,
  ogDescription: description,
  twitterDescription: description,
});

const setMetaThumbnail = (thumbnail: string) => ({
  ogImage: thumbnail,
  thumbnail,
  twitterImage: thumbnail,
});

const setMetaThumbnailAlt = (thumbnailAlt: string) => ({
  ogImageAlt: thumbnailAlt,
  twitterImageAlt: thumbnailAlt,
});

export const extractHead = ({
  canonical,
  title,
  description,
  thumbnail,
  thumbnailAlt,
  noindex,
}: HeadContent): MetaFlatInput => {
  const metaCanonical = canonical ? setMetaCanonical(canonical) : {};
  const metaTitle = title ? setMetaTitle(title) : {};
  const metaDescription = description ? setMetaDescription(description) : {};
  const metaThumbnail = thumbnail ? setMetaThumbnail(thumbnail) : {};
  const metaThumbnailAlt = thumbnailAlt ? setMetaThumbnailAlt(thumbnailAlt) : {};
  const metaRobots = noindex ? { robots: { all: false } } : {};

  return {
    ...metaCanonical,
    ...metaTitle,
    ...metaDescription,
    ...metaThumbnail,
    ...metaThumbnailAlt,
    ...metaRobots,
  };
};
