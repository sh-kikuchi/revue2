---
title: LaravelにVue3を導入
description: がっつりLaravelで作ったものにVue.jsを突っ込む
category: laravel_vue
createdAt: 2021-06-13
updatedAt: 2021-06-13
sortNumber: 001
path: "/articles/laravel_vue/001_install_vue"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. Vueのインストール。](#2-vueのインストール)
- [3. webpack.mix.jsを修正する。](#3-webpackmixjsを修正する)
- [4. npmビルドをしてみる。](#4-npmビルドをしてみる)
- [5.おわりに](#5おわりに)

<br>

# 1. はじめに
ことの発端は、私が作った「かんばん」というトレロ風アプリで、列やカードをドラッグ&ドロップさせたいという気持ちから始まった。その変更した並び順をデータベースに保存したいという気持ちは約１年に渡り、あったものの実現できずにいた。その間、Vueは2から3になっていたもので、腰が重くなっていたのだ。しかし、転職を控えている今（暇）ならば、立ち向かえるかもしれないと思い、ようやく戦う決意をしたのであった。まずは、Laravel9にVue3をインストールするところから。※重要かも→【前提】：今回は既存のLaravel9のアプリにVueを取り入れる想定。Laravel/uiでログイン認証を実装し、Bladeファイルベースでアプリは作られている。

# 2. Vueのインストール。
- まず、プロジェクトディレクトリで、下記のコマンドでVue3をインストール
```
npm install vue@next
```

<br>

- package.jsonでVue.jsがインストールされているかを確認
```
    "devDependencies": {
        ・・・
        "vue": "^3.2.36",
        ・・・
    },
```

<br>

# 3. webpack.mix.jsを修正する。
- まずは参考まで、【修正前】を載せておく↓。
```js
mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');
```

- 下記は【修正後】
```js
mix.js('resources/assets/js/app.js', 'public/js')
   .postCss('resources/css/app.css', 'public/css', [
   ]).vue()
   .sass('resources/assets/sass/app.scss', 'public/css');

```
※下記URL参考（最終閲覧日:2022/06/13）
https://chigusa-web.com/blog/laravel-vue3/


<br>

# 4. npmビルドをしてみる。
> npm run devやnpm run watchなどでエラーが出ないかを確かめる。一発で上手く行かない場合、vue-loaderがインストールされているかを確認する。※今回の場合、`@ development: cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js`のエラーが出ており、node_modulesのディレクトリは問題なく、vue-loaderのバージョンが合っていなかったことが原因であった。
```
npm i vue-loader  
```

- pacage.jsonを確認してみる。
```js
    "devDependencies": {
　　　　・・・
        "vue-loader": "^16.8.3",
        ・・・
    },
```

- 再びビルドを行い、app.jsやapp.cssが作成されればOK

<br>

# 5.おわりに
Vue.jsのインストールに関して、[チグサウェブ](https://chigusa-web.com/blog/laravel-vue3/)が大いに参考になった。インストールにあたって、package.jsonの「vue」と「vue-loader」の整合性が取れているかどうかポイントになりそう。npmビルドのエラーが上記の理由で吐き出していたことに気づくのに少し時間を要した。

</nuxt-content-wrapper>
