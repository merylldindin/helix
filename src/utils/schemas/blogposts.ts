import { DEFAULT_NAME, DEFAULT_URL } from "@/content";
import {
  ArticleContent,
  ContentType,
  GenericContent,
  HeadlineContent,
  SocialsContent,
} from "@/types";

interface BlogPostConfig {
  dateModified: string;
  datePublished: string;
  keywords: string[];
}

const getBlogPostReferences = (content: any): unknown | null => {
  const pageUrl = `${DEFAULT_URL}${content.head.canonical}`;

  const articles = content.components[0].props.content.filter(
    (item: GenericContent) => item.type === ContentType.ARTICLE
  ) as ArticleContent[];

  const articleLinks = articles.reduce((accumulator: any, article: ArticleContent) => {
    return [...accumulator, article.prop.href];
  }, []);

  const socials = content.components[0].props.content.filter(
    (item: GenericContent) => item.type === ContentType.SOCIALS
  ) as SocialsContent[];

  const socialLinks = socials.reduce((accumulator: any, social: SocialsContent) => {
    return [...accumulator, ...social.prop.map((item) => item.to)];
  }, []);

  const references = [...socialLinks, ...articleLinks];

  return references.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: [
          ...references.map((reference, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: reference,
          })),
        ],
        numberOfItems: references.length,
        url: pageUrl,
      }
    : null;
};

const getBlogHeadline = (content: any): string => {
  return (
    content.components[0].props.content.filter(
      (item: GenericContent) => item.type === ContentType.HEADLINE
    ) as HeadlineContent[]
  )[0].prop.text;
};

const getBlogImage = (content: any): string => {
  return content.components[0].props.background.source;
};

const getBlogBody = (content: any): string => {
  return content.components[0].props.content
    .filter((item: GenericContent) => item.type === ContentType.TEXT)
    .map((article: ArticleContent) => article.prop)
    .join(" ");
};

const getBlogWordCount = (articleBody: string): number => {
  return articleBody.split(" ").length;
};

const getBlogSchema = (content: any): unknown => {
  const pageUrl = `${DEFAULT_URL}${content.head.canonical}`;
  const configs: BlogPostConfig = content.schema.prop;
  const blogBody = getBlogBody(content);

  return {
    "@context": "https://schema.org",
    "@id": `${pageUrl}#blog`,
    "@type": "BlogPosting",
    articleBody: blogBody,
    author: {
      "@id": "https://merylldindin.com/#identity",
      "@type": "Person",
      name: DEFAULT_NAME,
    },
    dateModified: configs.dateModified,
    datePublished: configs.datePublished,
    description: content.head.description,
    headline: getBlogHeadline(content),
    image: getBlogImage(content),
    keywords: configs.keywords,
    mainEntityOfPage: {
      "@id": pageUrl,
      "@type": "WebPage",
    },
    publisher: {
      "@id": "https://merylldindin.com/#identity",
      "@type": "Person",
      name: DEFAULT_NAME,
    },
    url: pageUrl,
    wordCount: getBlogWordCount(blogBody),
  };
};

export const getBlogPostSchema = (content: any): unknown[] => {
  return [getBlogSchema(content), getBlogPostReferences(content)].filter(
    (item) => item !== null
  );
};
