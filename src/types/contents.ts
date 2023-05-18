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
