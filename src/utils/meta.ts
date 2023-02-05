import { HeadObject } from "@vueuse/head";

export type HeadContent = {
  title?: string;
  description?: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  noindex?: boolean;
};

const setMetaTitle = (title: string) => [
  {
    content: title,
    name: "title",
  },
  {
    content: title,
    property: "og:title",
  },
  {
    content: title,
    name: "twitter:title",
  },
];

const setMetaDescription = (description: string) => [
  {
    content: description,
    name: "description",
  },
  {
    content: description,
    property: "og:description",
  },
  {
    content: description,
    name: "twitter:description",
  },
];

const setMetaThumbnail = (thumbnail: string) => [
  {
    content: thumbnail,
    name: "thumbnail",
  },
  {
    content: thumbnail,
    property: "og:image",
  },
  {
    content: thumbnail,
    name: "twitter:image",
  },
];

const setMetaThumbnailAlt = (thumbnailAlt: string) => [
  {
    content: thumbnailAlt,
    property: "og:image:alt",
  },
  {
    content: thumbnailAlt,
    property: "twitter:image:alt",
  },
];

export const extractHead = ({
  title,
  description,
  thumbnail,
  thumbnailAlt,
  noindex,
}: HeadContent): HeadObject => ({
  meta: [
    ...(title ? setMetaTitle(title) : []),
    ...(description ? setMetaDescription(description) : []),
    ...(thumbnail ? setMetaThumbnail(thumbnail) : []),
    ...(thumbnailAlt ? setMetaThumbnailAlt(thumbnailAlt) : []),
    ...(noindex ? [{ content: "noindex", hid: "robots", name: "robots" }] : []),
  ],
  title,
});
