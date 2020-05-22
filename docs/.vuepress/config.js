module.exports = {
  title: "ninoseki.github.io",
  description: "(●__●)",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Posts", link: "/posts/" },
      { text: "About", link: "/about/" },
    ],
  },
  plugins: [
    [
      "@vuepress/blog",
      {
        directories: [
          {
            id: "post",
            dirname: "_posts",
            itemPermalink: "/:year/:month/:day/:slug.html",
          },
        ],
        feed: {
          canonical_base: "https://ninoseki.github.io",
        },
      },
    ],
    "@vuepress/last-updated",
    "vuepress-plugin-reading-time",
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-26296840-4",
      },
    ],
    [
      "@limdongjin/vuepress-plugin-simple-seo",
      {
        root_url: "https://ninoseki.github.io",
        default_site_name: "ninoseki.github.io",
        twitter_creator: "@ninoseki",
        twitter_site: "@ninoseki",
      },
    ],
  ],
};
