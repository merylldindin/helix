export interface DeliveredImage {
  altText: string;
  source: string;
  lazySource?: string;
}

export enum TextChunkType {
  PARAGRAPH = "p",
  BOLD = "b",
  ITALIC = "i",
  UNDERLINE = "u",
  LINK = "a",
}

interface LinkProps {
  href: string;
  target: string;
  rel: string;
}

interface TextChunk {
  type: TextChunkType;
  content: string;
  props?: LinkProps;
}

export type RichText = TextChunk[];
