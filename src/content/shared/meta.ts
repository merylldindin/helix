export const DEFAULT_NAME = "Meryll Dindin";

export const DEFAULT_TITLE =
  "Meryll Dindin - AI Executive and Serial Entrepreneur";

const DEFAULT_COLOR = "#242424";

export const DEFAULT_DESCRIPTION =
  "VP of Product & Engineering at Parallel Learning. Working across AI, technology, product, security, data, education, healthcare, and longevity.";

export const DEFAULT_URL = "https://merylldindin.com";

const DEFAULT_CDN_HOST = "https://cdn.merylldindin.com";

const DEFAULT_THUMBNAIL = `${DEFAULT_CDN_HOST}/thumbnails/minimalist.png`;

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
      as: "font" as const,
      crossorigin: "anonymous" as const,
      href: `${DEFAULT_CDN_HOST}/fonts/lexend-deca-regular.woff`,
      rel: "preload",
      type: "font/woff",
    },
  ],
  meta: [
    {
      charset: "utf8",
    },
    {
      content: "© 2026 Meryll Dindin",
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
      content: "initial-scale=1.0, maximum-scale=5.0, width=device-width",
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
      content: "Meryll Dindin",
      property: "og:site_name",
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
