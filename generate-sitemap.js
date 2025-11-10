const fetch = require('node-fetch');
const fs = require('fs');

const repoAPI = "https://api.github.com/repos/healthwiki/health-web-tools/contents/articles";
const baseURL = "https://apps.health.web.id/articles/"; // URL website

async function generateSitemap() {
  try {
    const res = await fetch(repoAPI);
    const files = await res.json();

    let urls = files
      .filter(file => file.name.endsWith(".md"))
      .map(file => {
        const slug = file.name.replace(".md",""); // misal: 2025-11-10-sleep-quality
        return `<url>
  <loc>${baseURL}${slug}</loc>
  <changefreq>weekly</changefreq>
</url>`;
      })
      .join("\n");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    fs.writeFileSync("sitemap.xml", sitemap);
    console.log("Sitemap generated successfully!");
  } catch (err) {
    console.error("Failed to generate sitemap:", err);
  }
}

generateSitemap();
