import LANDING_PAGE from "../../src/content/pages/LANDING_PAGE.json";
import MENTIONS_PAGE from "../../src/content/pages/MENTIONS_PAGE.json";
import MISSIONS_PAGE from "../../src/content/pages/MISSIONS_PAGE.json";
import PRIVACY_POLICY from "../../src/content/pages/PRIVACY_POLICY.json";
import SUGGESTIONS_PAGE from "../../src/content/pages/SUGGESTIONS_PAGE.json";
import TERMS_OF_USE from "../../src/content/pages/TERMS_OF_USE.json";
import THOUGHTS_PAGE from "../../src/content/pages/THOUGHTS_PAGE.json";
import VENTURES_PAGE from "../../src/content/pages/VENTURES_PAGE.json";
import BOOK_SUGGESTIONS from "../../src/content/pages/suggestions/BOOK_SUGGESTIONS.json";
import ENHANCER_SUGGESTIONS from "../../src/content/pages/suggestions/ENHANCER_SUGGESTIONS.json";
import NEWSLETTER_SUGGESTIONS from "../../src/content/pages/suggestions/NEWSLETTER_SUGGESTIONS.json";
import PODCAST_SUGGESTIONS from "../../src/content/pages/suggestions/PODCAST_SUGGESTIONS.json";
import TOOLKIT_SUGGESTIONS from "../../src/content/pages/suggestions/TOOLKIT_SUGGESTIONS.json";
import ARRHYTHMIA_CLASSIFICATION from "../../src/content/pages/thoughts/ARRHYTHMIA_CLASSIFICATION.json";
import FUTURE_OF_STORYTELLING from "../../src/content/pages/thoughts/FUTURE_OF_STORYTELLING.json";
import LEARNING_DIFFERENCES from "../../src/content/pages/thoughts/LEARNING_DIFFERENCES.json";
import MODELS_HUMAN_COGNITION from "../../src/content/pages/thoughts/MODELS_HUMAN_COGNITION.json";
import SLEEP_STAGE_CLASSIFICATION from "../../src/content/pages/thoughts/SLEEP_STAGE_CLASSIFICATION.json";
import TOMATO_CLUSTERING from "../../src/content/pages/thoughts/TOMATO_CLUSTERING.json";
import TOPOLOGICAL_DATA_ANALYSIS from "../../src/content/pages/thoughts/TOPOLOGICAL_DATA_ANALYSIS.json";
import AUBERGE_PAGE from "../../src/content/pages/ventures/AUBERGE_PAGE.json";
import CALASTER_PAGE from "../../src/content/pages/ventures/CALASTER_PAGE.json";
import DILLYGENCE_PAGE from "../../src/content/pages/ventures/DILLYGENCE_PAGE.json";
import FUJITSU_PAGE from "../../src/content/pages/ventures/FUJITSU_PAGE.json";
import PARALLEL_PAGE from "../../src/content/pages/ventures/PARALLEL_PAGE.json";
import POLYGON_PAGE from "../../src/content/pages/ventures/POLYGON_PAGE.json";
import SYSNAV_PAGE from "../../src/content/pages/ventures/SYSNAV_PAGE.json";

const ORIGIN = "https://merylldindin.com";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ROUTES_CONTENT: Record<string, any> = {
  "/": LANDING_PAGE,
  "/legal/privacy-policy/": PRIVACY_POLICY,
  "/legal/terms-of-use/": TERMS_OF_USE,
  "/mentions/": MENTIONS_PAGE,
  "/missions/": MISSIONS_PAGE,
  "/suggestions/": SUGGESTIONS_PAGE,
  "/suggestions/books/": BOOK_SUGGESTIONS,
  "/suggestions/enhancers/": ENHANCER_SUGGESTIONS,
  "/suggestions/newsletters/": NEWSLETTER_SUGGESTIONS,
  "/suggestions/podcasts/": PODCAST_SUGGESTIONS,
  "/suggestions/toolkits/": TOOLKIT_SUGGESTIONS,
  "/thoughts/": THOUGHTS_PAGE,
  "/thoughts/arrhythmia-classification/": ARRHYTHMIA_CLASSIFICATION,
  "/thoughts/future-of-storytelling/": FUTURE_OF_STORYTELLING,
  "/thoughts/learning-differences/": LEARNING_DIFFERENCES,
  "/thoughts/models-human-cognition/": MODELS_HUMAN_COGNITION,
  "/thoughts/sleep-stage-classification/": SLEEP_STAGE_CLASSIFICATION,
  "/thoughts/tomato-clustering/": TOMATO_CLUSTERING,
  "/thoughts/topological-data-analysis/": TOPOLOGICAL_DATA_ANALYSIS,
  "/ventures/": VENTURES_PAGE,
  "/ventures/auberge-de-cercoux/": AUBERGE_PAGE,
  "/ventures/calaster/": CALASTER_PAGE,
  "/ventures/dillygence/": DILLYGENCE_PAGE,
  "/ventures/fujitsu/": FUJITSU_PAGE,
  "/ventures/parallel-learning/": PARALLEL_PAGE,
  "/ventures/polygon/": POLYGON_PAGE,
  "/ventures/sysnav/": SYSNAV_PAGE,
};

function resolveUrl(url: string): string {
  return url.startsWith("/") ? `${ORIGIN}${url}` : url;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertContentItem(item: any): string {
  switch (item.type) {
    case "headline":
      return `${"#".repeat(item.prop.level)} ${item.prop.text}`;

    case "text":
      return item.prop;

    case "image":
      return `![${item.prop.altText}](${item.prop.source})`;

    case "button":
      return `[${item.prop.prompt}](${resolveUrl(item.prop.to)})`;

    case "more":
      return `[Read more](${resolveUrl(item.prop.to)})`;

    case "article":
      return `- **[${item.prop.title}](${item.prop.href})**: ${item.prop.description}`;

    case "reference": {
      const detail = item.prop.detail ? ` — ${item.prop.detail}` : "";
      return `- [${item.prop.text}](${item.prop.href})${detail}`;
    }

    case "socials":
      return item.prop
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((s: any) => `- [${s.ariaLabel}](${s.to})`)
        .join("\n");

    case "networks":
      return `> ${item.prop.quote}\n>\n> Source: ${resolveUrl(item.prop.url)}`;

    case "youtube":
      return `[Watch on YouTube](https://www.youtube.com/watch?v=${item.prop})`;

    default:
      return "";
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertContentArray(content: any[]): string {
  return content.map(convertContentItem).filter(Boolean).join("\n\n");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertFrameSection(props: any): string {
  return `## ${props.title}\n\n${props.description}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertTimelineSection(props: any): string {
  const grouped: Record<string, { href: string; name: string }[]> = {};

  for (const item of props.timeline) {
    const year = String(item.year);

    if (!grouped[year]) {
      grouped[year] = [];
    }

    grouped[year].push(item);
  }

  return Object.entries(grouped)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(
      ([year, items]) =>
        `### ${year}\n\n${items.map((i) => `- [${i.name}](${i.href})`).join("\n")}`,
    )
    .join("\n\n");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertRotatingCube(props: any): string {
  return props.pages
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((page: any) => {
      const heading = `## ${page.headline.prompt}`;
      const links = page.profiles
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((p: any) => `- [${p.slug}](${resolveUrl(p.link.to)})`)
        .join("\n");

      return `${heading}\n\n${links}`;
    })
    .join("\n\n");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertLegalParagraph(content: any[]): string {
  return content
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((node: any) => {
      if (node.type === "a") {
        return `[${node.content}](${resolveUrl(node.props.to)})`;
      }

      return node.content;
    })
    .join("");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertLegalSection(props: any): string {
  const parts: string[] = [];

  if (props.title) {
    parts.push(`# ${props.title}`);
  }

  if (props.date) {
    parts.push(`*${props.date}*`);
  }

  for (const item of props.content) {
    if (item.type === "subtitle") {
      parts.push(`## ${item.content}`);
    } else if (item.type === "paragraph") {
      parts.push(convertLegalParagraph(item.content));
    }
  }

  return parts.join("\n\n");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertComponent(component: any): string {
  const { name, props } = component;

  switch (name) {
    case "ARTICLE_SECTION":
      return convertContentArray(props.content);

    case "FRAME_SECTION":
      return convertFrameSection(props);

    case "IMAGE_SECTION":
      return convertContentArray(props.content);

    case "LEGAL_SECTION":
      return convertLegalSection(props);

    case "LINKS_SECTION":
      return convertContentArray(props.content);

    case "ROTATING_CUBE":
      return convertRotatingCube(props);

    case "TIMELINE_SECTION":
      return convertTimelineSection(props);

    default:
      return "";
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildFrontmatter(head: any): string {
  const lines: string[] = ["---"];

  lines.push(`title: ${JSON.stringify(head.title)}`);

  if (head.description) {
    lines.push(`description: ${JSON.stringify(head.description)}`);
  }

  lines.push("---");

  return lines.join("\n");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildMarkdown(page: any): string {
  const frontmatter = buildFrontmatter(page.head);
  const body = page.components
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((c: any) => convertComponent(c))
    .filter(Boolean)
    .join("\n\n---\n\n");

  return `${frontmatter}\n\n${body}`;
}

function normalizeRoute(route: string): string {
  if (route.endsWith("/index")) {
    return route.slice(0, -5);
  }

  return route === "/index" ? "/" : route;
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("mdream:markdown", async (context) => {
    const route = normalizeRoute(context.route);
    const page = ROUTES_CONTENT[route];

    if (page) {
      context.markdown = buildMarkdown(page);
      context.title = page.head.title;
      context.description = page.head.description || "";
    }
  });
});
