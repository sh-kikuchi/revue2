<script setup lang="ts">
import { ref } from 'vue'
import 'revuekitz/dist/style.css'
import { ChipText } from 'revuekitz';
const skills = ref(["Vue3", "TypeScript"]);
const to = ref("/projects/revuekitz/components");
</script>

<template>
  <section class="project-page">
    <h1 class="project-title">Revuekitz</h1>

    <section class="project-section">
        <div class="project-chips">
        <ChipText
          v-for="(skill, index) in skills" :key="index"
          :style="'display=block margin-right:5px; background-color: lightgray;'"
        >
          {{ skill }}
        </ChipText>
      </div>
      <img src="@/assets/images/projects/ranunculus.jpg" alt="Revuekitz Screenshot" class="project-image" />
    </section>
    <section class="project-section">
      <h2>📘 概要</h2>
      <p>
        "Revuekitz" は、Vue.js 用の UI コンポーネントライブラリです。私の個人サイトであるRe:vueから(https://sh-revue.net/) から、アトミックデザインに基づいて集めた原子・分子レベルのコンポーネントをライブラリとしてまとめました。
      </p>
    </section>

    <section class="project-section">
      <h2>✅ 主な特徴</h2>
      <ul class="features">
        <li>簡単に組み合わせてカスタマイズ可能</li>
        <li>ドキュメントが充実</li>
        <li>レスポンシブ対応</li>
      </ul>
    </section>

    <section class="project-section">
      <h2>✅ コンポーネント一覧</h2>
      <div class="features">
        <h4>Buttons</h4>
        <ul>
          <li><NuxtLink :to="'/articles/vue/101_basic_button'" class="nuxt-link">BasicButton</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/102_link_button'" class="nuxt-link">LinkButton</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/103_push_button'" class="nuxt-link">PushButton</NuxtLink></li>
        </ul>

        <h4>Displays</h4>
        <ul>
          <li><NuxtLink :to="'/articles/vue/201_card_flame'" class="nuxt-link">CardFlame</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/202_chip_text'" class="nuxt-link">ChipText</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/203_loading_loader'" class="nuxt-link">LoadingLoader</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/204_modal_dialog'" class="nuxt-link">ModalDialog</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/205_page_title'" class="nuxt-link">PageTitle</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/206_tab_panel'" class="nuxt-link">TabPanel</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/207_tool_tip'" class="nuxt-link">ToolTip</NuxtLink></li>
        </ul>

        <h4>Fields</h4>
        <ul>
          <li><NuxtLink :to="'/articles/vue/301_check_box_field'" class="nuxt-link">CheckBoxField</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/302_color_field'" class="nuxt-link">ColorField</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/303_date_field'" class="nuxt-link">DateField</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/304_file_field'" class="nuxt-link">FileField</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/305_money_field'" class="nuxt-link">MoneyField</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/306_multi_line_field'" class="nuxt-link">MultiLineField</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/307_number_field'" class="nuxt-link">NumberField</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/308_radio_field'" class="nuxt-link">RadioField</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/309_range_field'" class="nuxt-link">RangeField</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/310_select_field'" class="nuxt-link">SelectField</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/311_text_field'" class="nuxt-link">TextField</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/312_toggle_switch'" class="nuxt-link">ToggleSwitch</NuxtLink></li>
        </ul>

        <h4>Icons</h4>
        <ul>
          <li><NuxtLink :to="'/articles/vue/401_img_icon'" class="nuxt-link">ImgIcon</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/402_svg_icon'" class="nuxt-link">SvgIcon</NuxtLink></li>
        </ul>

        <h4>Layouts</h4>
        <ul>
          <li><NuxtLink :to="'/articles/vue/501_grid_column'" class="nuxt-link">GridColumn</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/502_grid_row'" class="nuxt-link">GridRow</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/503_layout_footer'" class="nuxt-link">LayoutFooter</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/504_layout_header'" class="nuxt-link">LayoutHeader</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/505_layout_wrapper'" class="nuxt-link">LayoutWrapper</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/506_nav_bar'" class="nuxt-link">NavBar</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/507_nav_list_item'" class="nuxt-link">NavBarItem</NuxtLink></li>
        </ul>

        <h4>Lists</h4>
        <ul>
          <li><NuxtLink :to="'/articles/vue/601_accordion_menu'" class="nuxt-link">AccordionMenu</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/602_basic_list'" class="nuxt-link">BasicList</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/603_breadcumb_list'" class="nuxt-link">BreadcrumbList</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/604_paginate_list'" class="nuxt-link">PaginateList</NuxtLink></li>
          <li><NuxtLink :to="'/articles/vue/605_tree_list'" class="nuxt-link">TreeList</NuxtLink></li>
        </ul>

        <h4>Table</h4>
        <ul>
          <li><NuxtLink :to="'/articles/vue/701_data_table'" class="nuxt-link">DataTable</NuxtLink></li>
        </ul>
      </div>
    </section>

    <section class="project-section">
      <h2>✅ 使い方</h2>
      <div>- ライブラリのインポート</div>
      <pre>
        npm install revuekitz
      </pre>
      <div>- コンポーネントの読み込み</div>
      <pre>
        import 'revuekitz/dist/style.css' // Import styles
        import { BasicButton } from 'revuekitz'
      </pre>
      <NuxtLink :to=to class="nuxt-link">サンプルページはこちら</NuxtLink>
    </section>

    <section class="project-section">
      <h2>🔗 リンク</h2>
      <div class="links">
        <a href="https://github.com/sh-kikuchi/revuekitz" target="_blank">GitHub</a>
        <a href="https://www.npmjs.com/package/revuekitz" target="_blank">npm</a>
      </div>
    </section>
  </section>
</template>

<style scoped>
.project-page {
  max-width: 860px;
  margin: 1rem auto;
  padding: 1rem;
  font-family: 'Segoe UI', sans-serif;
  background: #fff;
  color: #333;
}
.project-title {
  font-size: 2.2rem;
  margin-bottom: 0.25rem;
}
.project-subtitle {
  font-size: 1.1rem;
  color: #777;
  margin-bottom: 1.5rem;
}
.project-image {
  display: block;
  width: 50%;
  margin: 0 auto;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}
.project-chips{
  display: flex;
}

.project-section {
  margin-bottom: 2rem;
}
.features {
  padding-left: 1.25rem;
}
.links a {
  display: inline-block;
  margin-right: 1rem;
  color: #42b983;
  font-weight: bold;
  text-decoration: none;
}
.links a:hover {
  text-decoration: underline;
}
</style>
