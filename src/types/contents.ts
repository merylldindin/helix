import type { DeliveredImage } from "./global";

export enum ContentType {
  ARTICLE = "article",
  BUTTON = "button",
  HEADLINE = "headline",
  IMAGE = "image",
  MORE = "more",
  NETWORKS = "networks",
  REFERENCE = "reference",
  SOCIALS = "socials",
  TEXT = "text",
  YOUTUBE = "youtube",
}

export interface ArticleItem {
  href: string;
  title: string;
  description: string;
}

export interface ArticleContent {
  type: ContentType.ARTICLE;
  prop: ArticleItem;
}

export interface ButtonItem {
  ariaLabel: string;
  external?: boolean;
  prompt: string;
  rel?: string;
  target?: string;
  to: string;
}

export interface ButtonContent {
  type: ContentType.BUTTON;
  prop: ButtonItem;
}

interface HeadlineItem {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  typography: string;
  underlined?: boolean;
}

export interface HeadlineContent {
  type: ContentType.HEADLINE;
  prop: HeadlineItem;
}

export interface ImageContent {
  type: ContentType.IMAGE;
  prop: DeliveredImage;
}

export interface MoreContent {
  type: ContentType.MORE;
  prop: ButtonItem;
}

type NetworkItem = { quote: string; url: string };

export interface NetworksContent {
  type: ContentType.NETWORKS;
  prop: NetworkItem;
}

export interface ReferenceItem {
  href: string;
  text: string;
  description?: string;
  detail?: string;
  isPending?: boolean;
}

export interface ReferenceContent {
  type: ContentType.REFERENCE;
  prop: ReferenceItem;
}

export interface SocialsItem {
  ariaLabel: string;
  icon: string;
  rel: string;
  target: string;
  to: string;
}

export interface SocialsContent {
  type: ContentType.SOCIALS;
  prop: SocialsItem[];
}

export interface TextContent {
  type: ContentType.TEXT;
  prop: string;
}

export interface YoutubeContent {
  type: ContentType.YOUTUBE;
  prop: string;
}

export type GenericContent =
  | ArticleContent
  | ButtonContent
  | HeadlineContent
  | ImageContent
  | MoreContent
  | NetworksContent
  | ReferenceContent
  | SocialsContent
  | TextContent
  | YoutubeContent;

export interface TimelineContent {
  href: string;
  name: string;
  year: number;
}

export interface PageHead {
  canonical: string;
  title: string;
  description?: string;
  ogType?: string;
  thumbnail?: string;
  thumbnailAlt?: string;
}

export interface PageComponent {
  id: string;
  name: string;
  props?: Record<string, unknown>;
}

// Schema type definitions for JSON-LD structured data
export type ItemListSource =
  | "IMAGE_SECTION"
  | "LINKS_SECTION"
  | "ROTATING_CUBE"
  | "TIMELINE_SECTION";

export type SchemaType = "aboutPage" | "blogPosting" | "itemList" | "webPage";

export interface PageSchema {
  type: string;
  prop?: {
    additionalType?: string;
    dateModified?: string;
    datePublished?: string;
    keywords?: string;
    source?: string;
  };
}

export interface PageContent {
  components: PageComponent[];
  head: PageHead;
  layout: string;
  schema?: PageSchema;
}
