import { MetaFlatInput } from "zhead";

export type HeadContent = {
  title?: string;
  description?: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  noindex?: boolean;
};

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
  title,
  description,
  thumbnail,
  thumbnailAlt,
  noindex,
}: HeadContent): MetaFlatInput => {
  const metaTitle = title ? setMetaTitle(title) : {};
  const metaDescription = description ? setMetaDescription(description) : {};
  const metaThumbnail = thumbnail ? setMetaThumbnail(thumbnail) : {};
  const metaThumbnailAlt = thumbnailAlt ? setMetaThumbnailAlt(thumbnailAlt) : {};
  const metaRobots = noindex ? { robots: { all: false } } : {};

  return {
    ...metaTitle,
    ...metaDescription,
    ...metaThumbnail,
    ...metaThumbnailAlt,
    ...metaRobots,
  };
};
