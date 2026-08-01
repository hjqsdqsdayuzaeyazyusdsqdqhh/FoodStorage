import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import type { Element, Properties, Root } from "hast";
import type { Plugin } from "unified";

const BOX_LABELS: Record<string, string> = {
  tip: "Storage tip",
  safety: "Food safety",
  warning: "Warning",
  note: "Note",
};

const BOX_ICONS: Record<string, string> = {
  tip: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V17h6v-2.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z"/></svg>',
  safety:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>',
  warning:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
  note: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
};

function el(tagName: string, properties: Properties = {}, children: Element[] = []): Element {
  return { type: "element", tagName, properties, children };
}

function raw(value: string): Element {
  return { type: "raw", value } as unknown as Element;
}

function directiveHandler(state: { all: (n: unknown) => Element[] }, node: { name?: string; attributes?: Record<string, unknown> }): Element {
  const type = node.name ?? "note";
  const title = typeof node.attributes?.title === "string" ? node.attributes.title : BOX_LABELS[type] ?? BOX_LABELS.note;
  const body = state.all(node);
  const icon = raw(BOX_ICONS[type] ?? BOX_ICONS.note);
  return el(
    "div",
    { className: ["alert-box", `alert-box--${type}`] },
    [
      el("span", { className: ["alert-box__icon"], "aria-hidden": "true" }, [icon]),
      el("div", { className: ["alert-box__body"] }, [
        el("p", { className: ["alert-box__label"] }, [{ type: "text", value: title } as unknown as Element]),
        ...body,
      ]),
    ],
  );
}

const handlers: Record<string, (state: { all: (n: unknown) => Element[] }, node: { name?: string; attributes?: Record<string, unknown> }) => Element> = {
  containerDirective: directiveHandler,
  leafDirective: directiveHandler,
  textDirective: (_state, node) => raw(String(node.attributes?.title ?? "")),
};

function textContent(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as { type?: string; value?: string; children?: unknown[] };
  if (n.type === "text" || n.type === "raw") return n.value ?? "";
  if (Array.isArray(n.children)) return n.children.map(textContent).join("");
  return "";
}

const slugSeen = new Map<string, number>();

function slugify(text: string): string {
  const base = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  const count = slugSeen.get(base) ?? 0;
  slugSeen.set(base, count + 1);
  return count === 0 ? base : `${base}-${count}`;
}

/** Add ids to h2/h3/h4 for TOC anchors + jump links. */
const addHeadingIds: Plugin<[], Root> = () => (tree: Root) => {
  slugSeen.clear();
  visit(tree, "element", (node: Element) => {
    if (/^h[2-4]$/.test(node.tagName)) {
      node.properties.id = slugify(textContent(node));
    }
  });
};

/** Mark task-list <ul> elements so they render as printable checklists. */
const taskListClass: Plugin<[], Root> = () => (tree: Root) => {
  visit(tree, "element", (node: Element) => {
    if (node.tagName !== "ul") return;
    const li = node.children[0];
    if (!li || li.type !== "element" || li.tagName !== "li") return;
    const input = li.children[0];
    if (input && input.type === "element" && input.tagName === "input") {
      node.properties.className = ["checklist"];
      if (input.properties) delete input.properties.disabled;
    }
  });
};

/** Render a markdown string to HTML with directive support (alert boxes, checklists). */
export function renderMarkdown(md: string): string {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkDirective)
    .use(remarkRehype, {
      allowDangerousHtml: true,
      handlers,
    })
    .use(addHeadingIds)
    .use(taskListClass)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .processSync(md)
    .toString();
}
