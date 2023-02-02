const DEFAULT_TITLE = "Helix";

const DEFAULT_COLOR = "#242424";

const DEFAULT_DESCRIPTION =
  "Serial entrepreneur. Shaping the future of healthcare and artificial intelligence. Having a passion for crazy projects. Shaping the future globally.";

const DEFAULT_THUMBNAIL = "https://cdn.merylldindin.com/thumbnails/general.webp";

const DEFAULT_THUMBNAIL_ALT = "Meryll Dindin's personal website";

const DEFAULT_TWITTER_HANDLE = "@merylldindin";

export const CUSTOM_HEAD = {
  htmlAttrs: {
    lang: "en",
  },
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    { rel: "preconnect", href: "cdn.merylldindin.com" },
  ],
  meta: [
    { charset: "utf-8" },
    {
      content: "Meryll Dindin - &copy; 2023 - All Rights Reserved",
      hid: "copyright",
      name: "copyright",
    },
    {
      content: "index,follow",
      hid: "robots",
      name: "robots",
    },
    {
      content: DEFAULT_COLOR,
      hid: "theme-color",
      name: "theme-color",
    },
    {
      content: DEFAULT_COLOR,
      hid: "msapplication-navbutton-color",
      name: "msapplication-navbutton-color",
    },
    {
      content: DEFAULT_COLOR,
      hid: "apple-mobile-web-app-status-bar-style",
      name: "apple-mobile-web-app-status-bar-style",
    },
    {
      content: "width=device-width, initial-scale=1.0",
      hid: "viewport",
      name: "viewport",
    },
    {
      content: DEFAULT_TITLE,
      hid: "title",
      name: "title",
    },
    {
      content: DEFAULT_DESCRIPTION,
      hid: "description",
      name: "description",
    },
    {
      content: DEFAULT_THUMBNAIL,
      hid: "thumbnail",
      name: "thumbnail",
    },
    {
      content: DEFAULT_DESCRIPTION,
      hid: "og:description",
      property: "og:description",
    },
    {
      content: DEFAULT_THUMBNAIL,
      hid: "og:image",
      property: "og:image",
    },
    {
      content: DEFAULT_THUMBNAIL_ALT,
      name: "og:image:alt",
      property: "og:image:alt",
    },
    {
      content: "website",
      name: "og:type",
      property: "og:type",
    },
    {
      content: "summary_large_image",
      name: "twitter:card",
      vmid: "twitter:card",
    },
    {
      content: DEFAULT_TWITTER_HANDLE,
      name: "twitter:creator",
      vmid: "twitter:creator",
    },
    {
      content: DEFAULT_TWITTER_HANDLE,
      name: "twitter:site",
      vmid: "twitter:site",
    },
    {
      content: DEFAULT_DESCRIPTION,
      name: "twitter:description",
      vmid: "twitter:description",
    },
    {
      content: DEFAULT_TITLE,
      name: "twitter:title",
      vmid: "twitter:title",
    },
    {
      content: DEFAULT_THUMBNAIL,
      name: "twitter:image",
      vmid: "twitter:image",
    },
    {
      content: DEFAULT_THUMBNAIL_ALT,
      name: "twitter:image:alt",
      vmid: "twitter:image:alt",
    },
  ],
  title: DEFAULT_TITLE,
  titleTemplate: "%s - Meryll Dindin",
};
