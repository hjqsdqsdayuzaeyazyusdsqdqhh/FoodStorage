import { registry } from "@/lib/content";
import { site } from "@/lib/site";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const dynamic = "force-static";

export async function GET() {
  const items = registry
    .all()
    .filter((p) => p.template !== "search")
    .slice(0, 200)
    .map((p) => {
      const url = new URL(p.urlPath, site.url).toString();
      const desc = p.metaDescription || p.snippetAnswer || "";
      const date = p.updatedDate ?? p.reviewedDate;
      return `  <item>
    <title>${escapeXml(p.title)}</title>
    <link>${escapeXml(url)}</link>
    <guid>${escapeXml(url)}</guid>
    <pubDate>${new Date(date).toUTCString()}</pubDate>
    <description>${escapeXml(desc)}</description>
  </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXml(site.name)}</title>
  <link>${site.url}</link>
  <description>${escapeXml(site.description)}</description>
  <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
</channel>
</rss>`;

  return new Response(feed, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
