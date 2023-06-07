export enum ContentType {
  BUTTON = "button",
  HEADLINE = "headline",
  MORE = "more",
  TEXT = "text",
}

interface ButtonItem {
  ariaLabel: string;
  external?: boolean;
  prompt: string;
  rel?: string;
  target?: string;
  to: string;
}

interface HeadlineItem {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  typography: string;
  underlined?: boolean;
}

export interface ButtonContent {
  type: ContentType.BUTTON;
  prop: ButtonItem;
}

export interface MoreContent {
  type: ContentType.MORE;
  prop: ButtonItem;
}

export interface HeadlineContent {
  type: ContentType.HEADLINE;
  prop: HeadlineItem;
}

export interface TextContent {
  type: ContentType.TEXT;
  prop: string;
}

export type GenericContent =
  | ButtonContent
  | HeadlineContent
  | MoreContent
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
