export const DEFAULT_TITLE =
  "Serial Entrepreneur, Convinced Transhumanist | Meryll Dindin";

const DEFAULT_COLOR = "#242424";

export const DEFAULT_DESCRIPTION =
  "Serial entrepreneur. Shaping the future of healthcare, mental health, manufacturing, artificial intelligence. Having a passion for crazy projects, especially the ones involving complex systems.";

const DEFAULT_CDN_HOST = "https://cdn.merylldindin.com";

const DEFAULT_THUMBNAIL = `${DEFAULT_CDN_HOST}/thumbnails/general.webp`;

const DEFAULT_THUMBNAIL_ALT = "Meryll Dindin's personal website";

const DEFAULT_TWITTER_HANDLE = "@merylldindin";

export const CUSTOM_HEAD = {
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      href: "/favicon.ico",
      rel: "icon",
      type: "image/x-icon",
    },
    {
      href: DEFAULT_CDN_HOST,
      rel: "preconnect",
    },
    {
      as: "font" as "font",
      crossorigin: "anonymous" as "anonymous",
      href: `${DEFAULT_CDN_HOST}/fonts/lexend-deca-regular.ttf`,
      rel: "preload",
      type: "font/ttf",
    },
  ],
  meta: [
    {
      charset: "utf-8",
    },
    {
      content: "&copy; 2023 - Meryll Dindin - All Rights Reserved",
      name: "copyright",
    },
    {
      content: "index,follow",
      name: "robots",
    },
    {
      content: DEFAULT_COLOR,
      name: "theme-color",
    },
    {
      content: DEFAULT_COLOR,
      name: "msapplication-navbutton-color",
    },
    {
      content: DEFAULT_COLOR,
      name: "apple-mobile-web-app-status-bar-style",
    },
    {
      content: "width=device-width, initial-scale=1, maximum-scale=5",
      name: "viewport",
    },
    {
      content: DEFAULT_DESCRIPTION,
      name: "description",
    },
    {
      content: DEFAULT_THUMBNAIL,
      name: "thumbnail",
    },
    {
      content: DEFAULT_DESCRIPTION,
      property: "og:description",
    },
    {
      content: DEFAULT_THUMBNAIL,
      property: "og:image",
    },
    {
      content: DEFAULT_THUMBNAIL_ALT,
      property: "og:image:alt",
    },
    {
      content: "website",
      property: "og:type",
    },
    {
      content: "summary_large_image",
      name: "twitter:card",
    },
    {
      content: DEFAULT_TWITTER_HANDLE,
      name: "twitter:creator",
    },
    {
      content: DEFAULT_TWITTER_HANDLE,
      name: "twitter:site",
    },
    {
      content: DEFAULT_DESCRIPTION,
      name: "twitter:description",
    },
    {
      content: DEFAULT_TITLE,
      name: "twitter:title",
    },
    {
      content: DEFAULT_THUMBNAIL,
      name: "twitter:image",
    },
    {
      content: DEFAULT_THUMBNAIL_ALT,
      name: "twitter:image:alt",
    },
  ],
  title: DEFAULT_TITLE,
  titleTemplate: "%s",
};
