import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ninoseki.github.io",
  description: "(●__●) - Why are you looking into this?",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/index" },
      { text: "About", link: "/about" },
    ],
    search: {
      provider: "local",
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/ninoseki",
      },
      {
        icon: "twitter",
        link: "https://twitter.com/ninoseki",
      },
    ],
  },
});
