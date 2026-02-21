<script setup lang="ts">
// 今のところ特別なロジックは無し
</script>

<template>
  <div class="container">
    <h1>Cosmos</h1>
    <div class="flex-center">
      <img
        class="logo-img"
        src="/assets/images/projects/cosmos/logo.png"
      />
    </div>

    <p>Cosmos（コスモス）は、NASAのAPIを活用して「宇宙」を身近に感じられるビジュアルアプリ。</p>

    <div class="features">
      <h2>主な特徴</h2>
      <ul class="features-list">
        <li>APOD APIで毎日更新される「宇宙の一枚」を体験</li>
        <li>EPIC APIが捉えた、宇宙から見た地球のリアルタイム画像</li>
        <li>日付検索で過去の宇宙・地球画像アーカイブを探索</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 720px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fefefe;
  border-radius: 12px;
}

.flex-center{
  display: flex;
  justify-content: center;
}

.logo-img{
  display: block;
  width: 280px;
  height: auto;
  margin: 5px;
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
