import type { MetaFlatInput } from "unhead/types";

import { DEFAULT_URL } from "@/content";

export type HeadContent = {
  canonical?: string;
  title?: string;
  description?: string;
  ogType?: string;
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

const setMetaOgType = (ogType: string) => ({
  ogType,
});

export const extractHead = ({
  canonical,
  title,
  description,
  ogType,
  thumbnail,
  thumbnailAlt,
  noindex,
}: HeadContent): MetaFlatInput => {
  const metaCanonical = canonical ? setMetaCanonical(canonical) : {};
  const metaTitle = title ? setMetaTitle(title) : {};
  const metaDescription = description ? setMetaDescription(description) : {};
  const metaOgType = ogType ? setMetaOgType(ogType) : {};
  const metaThumbnail = thumbnail ? setMetaThumbnail(thumbnail) : {};
  const metaThumbnailAlt = thumbnailAlt ? setMetaThumbnailAlt(thumbnailAlt) : {};
  const metaRobots = noindex ? { robots: { all: false } } : {};

  return {
    ...metaCanonical,
    ...metaTitle,
    ...metaDescription,
    ...metaOgType,
    ...metaThumbnail,
    ...metaThumbnailAlt,
    ...metaRobots,
  };
};
