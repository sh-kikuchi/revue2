<script setup>
import { ref, onMounted } from "vue";
import 'revuekitz/dist/style.css'
import { PageTitle } from 'revuekitz'
import { LayoutWrapper } from 'revuekitz'
import { PaginateList } from 'revuekitz'
//PathParam
const route = useRoute();
const pathParam = route.params.lang;


//Search for articles
const articles = await queryContent('/articles/' + pathParam)
  .only(["title", "createdAt", "updatedAt", "description", "path"])
  .sort("sortNumber", "asc")
  .find();

const displayItems = ref([]); 


const getDispItems = (dispArray) => {
  displayItems.value = dispArray
}

</script>
<template>
  <PageTitle>Tech Blogs</PageTitle>
  <LayoutWrapper>
    <div class="navigation-bar pt-1">
      <nuxt-link to="/" tag="a" class="navigation"> Home</nuxt-link><span> ／ </span>
      <nuxt-link to="/tech2" tag="a" class="navigation"> Techs</nuxt-link>
    </div>
    <div class="ma-2" style="background-color: white; padding: 10px;">
      <div>
        <div v-for="(article, index) in displayItems" :key="index">
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
            <hr class="mt-3"/>
        </div>
        <!--PC用ページネーション-->
        <PaginateList
          @handleAction="getDispItems"
          :items = articles
          :steps=5
        ></PaginateList>
      </div>
    </div>
  </LayoutWrapper>
</template>
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
