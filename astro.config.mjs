import { defineConfig } from "astro/config";
import rehypeBilingual from "./src/plugins/rehype-bilingual.mjs";

export default defineConfig({
  site: "https://example.pages.dev",
  markdown: {
    rehypePlugins: [rehypeBilingual],
  },
});
