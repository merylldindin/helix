import { MetaInfo } from "vue-meta";

export type HeadContent = {
  title: string;
  meta?: {
    description?: string;
    thumbnail?: string;
    thumbnailAlt?: string;
    noindex?: boolean;
  };
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

export const extractHead = ({ title, meta = {} }: HeadContent): MetaInfo => ({
  title,
  meta: [
    ...(title ? setMetaTitle(title) : []),
    ...(meta.description ? setMetaDescription(meta.description) : []),
    ...(meta.thumbnail ? setMetaThumbnail(meta.thumbnail) : []),
    ...(meta.thumbnailAlt ? setMetaThumbnailAlt(meta.thumbnailAlt) : []),
    ...(meta.noindex ? [{ content: "noindex", hid: "robots", name: "robots" }] : []),
  ],
});
