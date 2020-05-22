<template>
  <div class="list-view">
    <div v-if="posts.length === 0" class="empty-list">
      Ooops! Nothing here..🙈
    </div>
    <ul v-else class="list">
      <li v-for="page of posts" :key="page.key" class="list-item">
        <router-link :to="page.path" class="item-title">
          {{ page.title }}
        </router-link>
        <span>({{ page.frontmatter.date.split("T")[0] }})</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
      // Order by publish date, desc
      return this.$site.pages
        .filter((item) => item.id === "post")
        .sort((a, b) => {
          return (
            new Date(b.frontmatter.date || b.lastUpdated) -
            new Date(a.frontmatter.date || a.lastUpdated)
          );
        });
    },
  },
};
</script>
