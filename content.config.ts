import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: {
        include: '**/*',
        // articles/vue は documents/revuekitz と同じ path を名乗る古い重複コンテンツ、
        // manuscripts は下書きのため、どちらも配信対象から除外する
        exclude: ['articles/vue/**', 'manuscripts/**']
      }
    })
  }
})
