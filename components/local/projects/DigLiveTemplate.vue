<script setup lang="ts">
</script>

<template>
  <div class="container">
    <h1>DigLive</h1>

    <p>DigLive（ディグライブ）は、音楽ファンの「日々のライブ体験」を記録・整理するために開発されたAndroid対応のモバイルアプリです。</p>

    <p>ライブ名、会場、出演アーティスト、セットリスト、MCの内容、サプライズ演出などを記録して、あなただけのライブ記録を作成できます。</p>

    <div class="features">
      <h2>主な機能</h2>
      <ul class="features-list">
        <li>アーティスト情報の記録（出演アーティスト、共演者、プロフィール）</li>
        <li>ライブメモの記録（MC・感想・サプライズなど）</li>
        <li>チケット情報の紐付け（種類・座席・価格・購入方法）</li>
        <li>CSV出力によるデータバックアップや外部活用</li>
      </ul>
    </div>

    <p>DigLiveは、あなたの音楽ライフを記録する「ライブノート」。小さな記録が、大きな思い出になる。</p>

    <p class="links">
      <NuxtLink to="/projects/diglive/components" class="nuxt-link">コンポーネント一覧はこちら</NuxtLink>
    </p>
  </div>
</template>

<style scoped>
.container {
  max-width: 720px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fefefe;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.features-list {
  padding-left: 1.25rem;
  margin-bottom: 1rem;
}

.links a {
  display: inline-block;
  margin-right: 1rem;
  text-decoration: none;
  color: #007bff;
}
</style>
