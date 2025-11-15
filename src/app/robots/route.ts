import { MetadataRoute } from "next";

export function GET() {
  const robots = `
User-agent: *
Allow: /
Sitemap: https://chazen.de/sitemap.xml
  `;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
