import { DEFAULT_NAME, DEFAULT_URL } from "@/content";
import type {
  ArticleContent,
  GenericContent,
  HeadlineContent,
  PageContent,
  SocialsContent,
} from "@/types";
import { ContentType } from "@/types";

interface BlogPostConfig {
  dateModified: string;
  datePublished: string;
  keywords: string | string[];
}

interface ArticleSectionProps {
  background: { source: string };
  content: GenericContent[];
}

const getArticleProps = (content: PageContent): ArticleSectionProps => {
  const props = content.components[0]?.props;
  return props as unknown as ArticleSectionProps;
};

const getBlogPostReferences = (content: PageContent): unknown | null => {
  const pageUrl = `${DEFAULT_URL}${content.head.canonical}`;
  const props = getArticleProps(content);

  const articles = props.content.filter(
    (item: GenericContent) => item.type === ContentType.ARTICLE
  ) as ArticleContent[];

  const articleLinks = articles.reduce((accumulator: string[], article: ArticleContent) => {
    return [...accumulator, article.prop.href];
  }, []);

  const socials = props.content.filter(
    (item: GenericContent) => item.type === ContentType.SOCIALS
  ) as SocialsContent[];

  const socialLinks = socials.reduce((accumulator: string[], social: SocialsContent) => {
    return [...accumulator, ...social.prop.map((item) => item.to)];
  }, []);

  const references = [...socialLinks, ...articleLinks];

  return references.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: references.map((reference, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: reference,
        })),
        numberOfItems: references.length,
        url: pageUrl,
      }
    : null;
};

const getBlogHeadline = (content: PageContent): string => {
  const props = getArticleProps(content);
  const headlines = props.content.filter(
    (item: GenericContent) => item.type === ContentType.HEADLINE
  ) as HeadlineContent[];

  return headlines[0]?.prop.text ?? "";
};

const getBlogImage = (content: PageContent): string => {
  const props = getArticleProps(content);
  return props.background.source;
};

const getBlogBody = (content: PageContent): string => {
  const props = getArticleProps(content);
  return props.content
    .filter((item: GenericContent) => item.type === ContentType.TEXT)
    .map((item) => item.prop as string)
    .join(" ");
};

const getBlogWordCount = (articleBody: string): number => {
  return articleBody.split(" ").length;
};

const getReadingTime = (wordCount: number): string => {
  const minutes = Math.ceil(wordCount / 200);
  return `PT${minutes}M`;
};

const parseKeywords = (keywords: string | string[]): string[] => {
  if (Array.isArray(keywords)) {
    return keywords;
  }
  return keywords.split(",").map((k) => k.trim());
};

const getBlogSchema = (content: PageContent): unknown => {
  const pageUrl = `${DEFAULT_URL}${content.head.canonical}`;
  const configs = content.schema?.prop as BlogPostConfig;
  const blogBody = getBlogBody(content);
  const wordCount = getBlogWordCount(blogBody);

  return {
    "@context": "https://schema.org",
    "@id": `${pageUrl}#blog`,
    "@type": "BlogPosting",
    articleBody: blogBody,
    author: {
      "@id": `${DEFAULT_URL}#identity`,
      "@type": "Person",
      name: DEFAULT_NAME,
    },
    dateModified: configs.dateModified,
    datePublished: configs.datePublished,
    description: content.head.description,
    headline: getBlogHeadline(content),
    image: getBlogImage(content),
    inLanguage: "en-US",
    isPartOf: { "@id": `${DEFAULT_URL}#website` },
    keywords: parseKeywords(configs.keywords),
    mainEntityOfPage: {
      "@id": pageUrl,
      "@type": "WebPage",
    },
    publisher: {
      "@id": `${DEFAULT_URL}#identity`,
      "@type": "Person",
      name: DEFAULT_NAME,
    },
    timeRequired: getReadingTime(wordCount),
    url: pageUrl,
    wordCount,
  };
};

export const getBlogPostSchema = (content: PageContent): unknown[] => {
  return [getBlogSchema(content), getBlogPostReferences(content)].filter(
    (item) => item !== null
  );
};
