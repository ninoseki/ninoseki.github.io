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

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class PostIndex extends Vue {
  get posts() {
    return this.$site.pages
      .filter((item) => item.regularPath.startsWith("/_posts/") === true)
      .sort((a, b) => {
        if (a.regularPath < b.regularPath) {
          return 1;
        } else {
          return -1;
        }
      });
  }
}
</script>
