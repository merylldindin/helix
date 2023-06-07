import { DeliveredImage } from "./global";

export enum ContentType {
  ARTICLE = "article",
  BUTTON = "button",
  HEADLINE = "headline",
  IMAGE = "image",
  MORE = "more",
  SOCIALS = "socials",
  TEXT = "text",
}

interface ArticleItem {
  href: string;
  title: string;
  description: string;
}

export interface ArticleContent {
  type: ContentType.ARTICLE;
  prop: ArticleItem;
}

interface ButtonItem {
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

interface SocialsItem {
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

export type GenericContent =
  | ArticleContent
  | ButtonContent
  | HeadlineContent
  | ImageContent
  | MoreContent
  | SocialsContent
  | TextContent;

export interface PageHead {
  canonical: string;
  title: string;
  description?: string;
  thumbnail?: string;
}

export interface PageComponent {
  id: string;
  name: string;
  props?: Record<string, any>;
}
