export interface DeliveredImage {
  altText: string;
  source: string;
  eager?: boolean;
  lazySource?: string;
  mobile?: string;
  lazyMobile?: string;
}

export enum TextChunkType {
  BOLD = "b",
  ITALIC = "i",
  LINK = "a",
  PARAGRAPH = "p",
  UNDERLINE = "u",
}

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
