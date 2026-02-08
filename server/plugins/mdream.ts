import { htmlToMarkdown } from "mdream";
import {
  extractionPlugin,
  filterPlugin,
  frontmatterPlugin,
  tailwindPlugin,
} from "mdream/plugins";

const ORIGIN = "https://merylldindin.com";

function cleanMarkdown(raw: string): string {
  return raw
    .replace(/^\[<h1>.*?<\/h1>\]\([^)]*\)\s*$/gm, "")
    .replace(/^\[Meryll Dindin\]\([^)]*\)\s*$/gm, "")
    .replace(/^- \/ \[.*?\]\([^)]*\)\s*$/gm, "")
    .replace(/^By browsing through my website.*$/gm, "")
    .replace(/^\[]\([^)]*\)\s*$/gm, "")
    .replace(/^_{2,}\s*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function convertPage(html: string): {
  markdown: string;
  title: string;
  description: string;
} {
  const meta = { title: "", description: "" };

  const raw = htmlToMarkdown(html, {
    origin: ORIGIN,
    plugins: [
      extractionPlugin({
        title(el) {
          meta.title = el.textContent;
        },
        'meta[name="description"]': (el) => {
          meta.description = el.attributes.content || "";
        },
      }),
      frontmatterPlugin(),
      tailwindPlugin(),
      filterPlugin({
        exclude: [
          "header",
          "nav",
          "footer",
          "form",
          "iframe",
          "button",
          "figure",
          "aside",
          "fieldset",
          "object",
          "embed",
          "input",
          "textarea",
          "select",
        ],
      }),
    ],
  });

  const markdown = cleanMarkdown(raw);

  return { markdown, title: meta.title, description: meta.description };
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("mdream:markdown", async (context) => {
    const route = context.route;
    const correctedPath = route.endsWith("/index")
      ? route.slice(0, -5)
      : route;

    if (correctedPath !== route) {
      const response = await globalThis.$fetch.raw(correctedPath);
      const html =
        typeof response._data === "string" ? response._data : context.html;
      const result = convertPage(html);

      context.markdown = result.markdown;
      context.title = result.title;
      context.description = result.description;
    } else {
      const result = convertPage(context.html);

      context.markdown = result.markdown;
      if (result.title) context.title = result.title;
      if (result.description) context.description = result.description;
    }
  });
});
