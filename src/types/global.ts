export interface DeliveredImage {
  altText: string;
  source: string;
  eager?: boolean;
  lazySource?: string;
}

export enum TextChunkType {
  BOLD = "b",
  ITALIC = "i",
  LINK = "a",
  PARAGRAPH = "p",
  UNDERLINE = "u",
}

interface InternalLinkProps {
  to: string;
  underline?: boolean;
}

interface ExternalLinkProps {
  href: string;
  target: string;
  rel: string;
  underline?: boolean;
}

interface TextChunk {
  type: TextChunkType;
  content: string;
  props?: InternalLinkProps | ExternalLinkProps;
}

export type RichText = TextChunk[];
