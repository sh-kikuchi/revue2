<script setup lang="ts">
// 今のところ特別なロジックは無し
</script>

<template>
  <div class="container">
    <h1>Cosmos</h1>

    <p>Cosmos（コスモス）は、NASAのAPIを活用して「今日の宇宙」を身近に感じられるビジュアルアプリです。</p>

    <p>日替わりで提供される宇宙の写真を楽しみ、お気に入りにはコメントを残して、あなたの“宇宙日記”を作成できます。</p>

    <div class="features">
      <h2>主な機能</h2>
      <ul class="features-list">
        <li>NASA APIによる宇宙画像の自動取得</li>
        <li>気に入った画像にコメントを残せる日記機能</li>
        <li>LINEボットで画像の自動通知（近日公開）</li>
        <li>火星探査機（Mars Rover）が撮影した写真ギャラリー（開発中）</li>
      </ul>
    </div>

    <p>Cosmosは、毎日の空を「宇宙の窓」に変えるアプリ。今日の宇宙を、あなたの言葉で残そう。</p>

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
