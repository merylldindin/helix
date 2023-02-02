import { UseHeadInput } from "@vueuse/head";

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
    hid: "title",
    name: "title",
  },
  {
    content: title,
    hid: "og:title",
    property: "og:title",
  },
  {
    content: title,
    hid: "twitter:title",
    name: "twitter:title",
  },
];

const setMetaDescription = (description: string) => [
  {
    content: description,
    hid: "description",
    name: "description",
  },
  {
    content: description,
    hid: "og:description",
    property: "og:description",
  },
  {
    content: description,
    hid: "twitter:description",
    name: "twitter:description",
  },
];

const setMetaThumbnail = (thumbnail: string) => [
  {
    content: thumbnail,
    hid: "thumbnail",
    name: "thumbnail",
  },
  {
    content: thumbnail,
    hid: "og:image",
    property: "og:image",
  },
  {
    content: thumbnail,
    hid: "twitter:image",
    name: "twitter:image",
  },
];

const setMetaThumbnailAlt = (thumbnailAlt: string) => [
  {
    content: thumbnailAlt,
    hid: "og:image:alt",
    property: "og:image:alt",
  },
  {
    content: thumbnailAlt,
    hid: "twitter:image:alt",
    property: "twitter:image:alt",
  },
];

export const extractHead = ({
  title,
  description,
  thumbnail,
  thumbnailAlt,
  noindex,
}: HeadContent): UseHeadInput => ({
  title,
  meta: [
    ...(title ? setMetaTitle(title) : []),
    ...(description ? setMetaDescription(description) : []),
    ...(thumbnail ? setMetaThumbnail(thumbnail) : []),
    ...(thumbnailAlt ? setMetaThumbnailAlt(thumbnailAlt) : []),
    ...(noindex ? [{ content: "noindex", hid: "robots", name: "robots" }] : []),
  ],
});