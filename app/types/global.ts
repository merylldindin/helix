export const ImageDarkModeTreatment = {
  INVERT_ON_DARK: "invert-on-dark",
} as const;

export type ImageDarkModeTreatment =
  (typeof ImageDarkModeTreatment)[keyof typeof ImageDarkModeTreatment];

export interface DeliveredImage {
  altText: string;
  darkModeTreatment?: ImageDarkModeTreatment;
  source: string;
  eager?: boolean;
  lazySource?: string;
  mobile?: string;
  lazyMobile?: string;
  zoomable?: boolean;
}

export interface DeliveredVideo {
  altText: string;
  source: string;
  poster?: string;
  mobile?: string;
}

export const TextChunkType = {
  BOLD: "b",
  ITALIC: "i",
  LINK: "a",
  PARAGRAPH: "p",
  UNDERLINE: "u",
} as const;

export type TextChunkType = (typeof TextChunkType)[keyof typeof TextChunkType];

interface InternalLink {
  to: string;
  underline?: boolean;
}

export interface ExternalLink {
  ariaLabel: string;
  href: string;
  target: string;
  rel: string;
  underline?: boolean;
}

interface TextChunk {
  type: TextChunkType;
  content: string;
  props?: InternalLink | ExternalLink;
}

export type RichText = TextChunk[];
