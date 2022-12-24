<template>
  <PageTitle title="Tech Blogs" />
  <Wrapper>
    <div class="navigation-bar pt-1">
      <v-icon>mdi-home</v-icon>
      <nuxt-link to="/" tag="a" class="navigation"> Home</nuxt-link><span> ／ </span>
      <v-icon>mdi-fountain-pen</v-icon>
      <nuxt-link to="/blog" tag="a" class="navigation"> Blog</nuxt-link>
      <!-- <v-subheader tag="div" class="text-center">記事一覧</v-subheader> -->
    </div>
    <v-list class="ma-2">
      <div>
        <v-list-item v-for="(article, index) in pagination.contents" :key="index">
            <nuxt-link :to="article.path" tag="div" class="tag-div-nuxt-link">
              <div>
                <div class="text-right">
                  <span>更新日:{{ article.updatedAt }}</span>
                </div>
                <h2>
                  <span>{{ index + 1 }}. </span>{{ article.title }}
                </h2>
                <p class="pt-2 pl-2">{{ article.description }}</p>
              </div>
            </nuxt-link>
        </v-list-item>
        <!--PC用ページネーション-->
        <v-pagination tag="div" class="pagination sp" v-model="pagination.page" :length="pagination.length" @click="pageChange(pagination.page)"></v-pagination>
        <!-- <v-pagination v-model="page" :length="Math.ceil(articles.length / 5)"></v-pagination> -->
      </div>
    </v-list>
  </Wrapper>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import Wrapper from "~~/components/commons/Wrapper.vue";
import PageTitle from "~~/components/commons/PageTitle.vue";
//PathParam
const route = useRoute();
const pathParam = route.params.lang;

const pagination = reactive({
  page: 0,
  pageSize: 10,
  contents: 0,
  length:0
});


//Search for articles
const articles = await queryContent('/articles/' + pathParam)
  .only(["title", "createdAt", "updatedAt", "description", "path"])
  .sort("sortNumber", "asc")
  .find();

//pagination
const pageChange = (num) => {
  pagination.contents = articles.slice(
    pagination.pageSize * (num - 1),
    pagination.pageSize * num
  )
}

onMounted(() => {
  console.log("onMounted");
  pagination.length = Math.ceil(articles.length / pagination.pageSize);
  pagination.contents = articles.slice(0, pagination.pageSize);
});

</script>
<style scoped>
.navigation {
  color: black;
  text-decoration: none;
}

.navigation:hover {
  color: darkslategray;
}

.article-list-container {
  max-width: 820px;
  margin: 0 auto;
}

.tag-div-nuxt-link {
  color: black;
  text-decoration: none;
}

.list-item-content {
  border-bottom: 1px dotted black;
}

</style>
