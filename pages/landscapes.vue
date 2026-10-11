<script setup>
import 'revuekitz/dist/style.css'
import { PageTitle } from 'revuekitz'
import hokkaido from '@/assets/images/landscapes/prefectures/hokkaido.jpg'
import fukushima from '@/assets/images/landscapes/prefectures/fukushima.jpg'
import akita from '@/assets/images/landscapes/prefectures/akita.jpg'
import miyagi from '@/assets/images/landscapes/prefectures/miyagi.jpg'
import iwate from '@/assets/images/landscapes/prefectures/iwate.jpg'
import aomori from '@/assets/images/landscapes/prefectures/aomori.jpg'
import kanagawa from '@/assets/images/landscapes/prefectures/kanagawa.jpg'
import chiba from '@/assets/images/landscapes/prefectures/chiba.jpg'
import saitama from '@/assets/images/landscapes/prefectures/saitama.jpg'
import gunma from '@/assets/images/landscapes/prefectures/gunma.jpg'
import tochigi from '@/assets/images/landscapes/prefectures/tochigi.jpg'
import aichi from '@/assets/images/landscapes/prefectures/aichi.jpg'
import shizuoka from '@/assets/images/landscapes/prefectures/shizuoka.jpg'
import gifu from '@/assets/images/landscapes/prefectures/gifu.jpg'
import nagano from '@/assets/images/landscapes/prefectures/nagano.jpg'
import yamanashi from '@/assets/images/landscapes/prefectures/yamanashi.jpg'
import fukui from '@/assets/images/landscapes/prefectures/fukui.jpg'
import osaka from '@/assets/images/landscapes/prefectures/osaka.jpg'
import kyoto from '@/assets/images/landscapes/prefectures/kyoto.jpg'
import shiga from '@/assets/images/landscapes/prefectures/shiga.jpg'
import fukuoka from '@/assets/images/landscapes/prefectures/fukuoka.jpg'
import toyama from '@/assets/images/landscapes/prefectures/toyama.jpg'
import ishikawa from '@/assets/images/landscapes/prefectures/ishikawa.jpg'
import ibaraki from '@/assets/images/landscapes/prefectures/ibaraki.jpg'
import yamaguchi from '@/assets/images/landscapes/prefectures/yamaguchi.jpg'
import hiroshima from '@/assets/images/landscapes/prefectures/hiroshima.jpg'
import shimane from '@/assets/images/landscapes/prefectures/shimane.jpg'
import wakayama from '@/assets/images/landscapes/prefectures/wakayama.jpg'
import hyogo from '@/assets/images/landscapes/prefectures/hyogo.jpg'
import okayama from '@/assets/images/landscapes/prefectures/okayama.jpg'
import mie from '@/assets/images/landscapes/prefectures/mie.jpg'
import tokushima from '@/assets/images/landscapes/prefectures/tokushima.jpg'
import tottori from '@/assets/images/landscapes/prefectures/tottori.jpg'
import kagawa from '@/assets/images/landscapes/prefectures/kagawa.jpg'

import { LayoutWrapper } from 'revuekitz'
import GalleryModal from '@/components/local/landscapes/GalleryModal.vue'

//モーダル
const state = reactive({
  isVisible: false,
  setItem:{}
});
const showModal = (value) => {
  state.setItem = value;
  state.isVisible = true;
};
const closeTestModal = () => {
  state.isVisible = false;
};

const items = [
  {
    id: "01",
    filename: hokkaido,
    title: "函館の坂本さん",
    prefecture: "北海道",
    area: "hokkaido",
    date: "2017-02-20",
    comment: "函館にそんなに所縁がある訳ではないけれど、こうしてパイを構いながら待っている。"
  },
  {
    id: "02",
    filename: aomori,
    title: "豪雨、館のねぶた",
    prefecture: "青森県",
    area: "tohoku",
    date: "2018-08-24",
    comment: "GLAYライブ直前、W台風の懸念でそわそわしながら鑑賞。フェリーが出るんかいな…と。"
  },
  {
    id: "03",
    filename: iwate,
    title: "浄土ヶ浜",
    prefecture: "岩手県",
    area: "tohoku",
    date: "2022-06-21",
    comment: "御台場展望台から見ると、海が綺麗。岩の削れ具合とかも好き。"
  },
  {
    id: "04",
    filename: miyagi,
    title: "グリコワゴン Ver.901",
    prefecture: "宮城県",
    area: "tohoku",
    date: "2014-09-20",
    comment: "初めてのGLAY LIVE。ちょっと観光もしたかった。それより写真後方の人間の多さ。"
  },
  {
    id: "05",
    filename: akita,
    title: "厳冬の日本海シリーズvol.2",
    prefecture: "秋田県",
    area: "tohoku",
    date: "2020-02-23",
    comment: "田沢湖の吹雪で死にそうになる。"
  },
  {
    id: "07",
    filename: fukushima,
    title: "東北絆まつり",
    prefecture: "福島県",
    area: "tohoku",
    date: "2019-06-01",
    comment: "GLAY EXPO以降、行ってみたかった東北六魂祭が形を変えて絆まつりに。福島はわらじ祭り。"
  },
  {
    id: "08",
    filename: ibaraki,
    title: "ゲリラ筑波山",
    prefecture: "茨城県",
    area: "kanto",
    date: "2025-10-27",
    comment: "会社の計画休、やることなさすぎて登山する。仕事疲れには良くない。"
  },
  {
    id: "09",
    filename: tochigi,
    title: "【赤羽から終電ツアー vol.2】東京ではない方の小金井",
    prefecture: "栃木県",
    area: "kanto",
    date: "2022-03-19",
    comment: "終電で向かった先は無。タクシーさえもなく、路面の文字「タクシー」だけが佇む。"
  },
  {
    id: "10",
    filename: gunma,
    title: "【赤羽から終電ツアー vol.1】深夜のプログラミング逃避。",
    prefecture: "群馬県",
    area: "kanto",
    date: "2021-03-30",
    comment: "城跡に県庁あるある。夜に見に行くことではない。結局、ファミレスでプログラムを書く病に陥るし。嗚呼、逃げたい。"
  },
  {
    id: "11",
    filename: saitama,
    title: "埼玉の水。",
    prefecture: "埼玉県",
    area: "kanto",
    date: "2019-08-18",
    comment: "人工湖だけど。"
  },
  {
    id: "12",
    filename: chiba,
    title: "二人セゾン",
    prefecture: "千葉県",
    area: "kanto",
    date: "2022-07-31",
    comment: "幕張、日陰がなく、蜂が多い。"
  },
  {
    id: "14",
    filename: kanagawa,
    title: "アヒル口",
    prefecture: "神奈川県",
    area: "kanto",
    date: "2022-01-02",
    comment: "7年ぶりに菅原公に会ってきました。学術をめぐっていっぱい喧嘩したね。"
  },
  {
    id: "16",
    filename: toyama,
    title: "厳冬の日本海シリーズvol.3",
    prefecture: "富山県",
    area: "chubu",
    date: "2021-12-11",
    comment: "クロムクロの聖地巡礼。..."
  },
  {
    id: "17",
    filename: ishikawa,
    title: "厳冬の日本海シリーズvol.4",
    prefecture: "石川県",
    area: "chubu",
    date: "2022-12-28",
    comment: "雪が残る寒い雨の日。..."
  },
  {
    id: "18",
    filename: fukui,
    title: "小熊猫",
    prefecture: "福井県",
    area: "chubu",
    date: "2019-01-10",
    comment: "気高そうだけど、そういう所がかわいいのだ"
  },
  {
    id: "19",
    filename: yamanashi,
    title: "夜勤明け、ワイン買いにゆく。",
    prefecture: "山梨県",
    area: "chubu",
    date: "2021-03-23",
    comment: "グラン・シャンモリ..."
  },
  {
    id: "20",
    filename: nagano,
    title: "車山の岩々",
    prefecture: "長野県",
    area: "chubu",
    date: "2019-08-05",
    comment: "トンボが沢山いた記憶がある。"
  },
  {
    id: "21",
    filename: gifu,
    title: "琵琶湖への漂流",
    prefecture: "岐阜県",
    area: "chubu",
    date: "2022-03-11",
    comment: "愛知・岐阜・滋賀をまとめて1日で。"
  },
  {
    id: "22",
    filename: shizuoka,
    title: "沼津のシーラカンスくん。",
    prefecture: "静岡県",
    area: "chubu",
    date: "2019-08-30",
    comment: "グソクムシも可愛かったんだよな。"
  },
  {
    id: "23",
    filename: aichi,
    title: "早朝の城。",
    prefecture: "愛知県",
    area: "chubu",
    date: "2020-01-19",
    comment: "家康が築城…"
  },
  {
    id: "24",
    filename: mie,
    title: "リアス式海岸を見たい。",
    prefecture: "三重県",
    area: "kinki",
    date: "2025-03-29",
    comment: "春の匂いを感じながらでピクニック気分で行けて良かった。"
  },
  {
    id: "25",
    filename: shiga,
    title: "養老乃瀧ではない、養老の滝へ",
    prefecture: "滋賀県",
    area: "kinki",
    date: "2022-03-11",
    comment: "滝壺へ落ちる水と壺の水のうねりは魅でした。"
  },
  {
    id: "26",
    filename: kyoto,
    title: "京都北区",
    prefecture: "京都府",
    area: "kinki",
    date: "2022-06-01",
    comment: "渡月橋～金閣寺～上賀茂神社..."
  },
  {
    id: "27",
    filename: osaka,
    title: "難波の獅子さん",
    prefecture: "大阪府",
    area: "kinki",
    date: "2019-03-20",
    comment: "顎関節症なんだよなーと思いながら…"
  },
  {
    id: "28",
    filename: hyogo,
    title: "西の中華街",
    prefecture: "兵庫県",
    area: "kinki",
    date: "2024-01-21",
    comment: "お散歩しやすく良き。"
  },
  {
    id: "30",
    filename: wakayama,
    title: "念願のパンダ",
    prefecture: "和歌山県",
    area: "kinki",
    date: "2023-08-27",
    comment: "楓浜さんにようやく逢えた。"
  },
  {
    id: "31",
    filename: tottori,
    title: "厳冬の日本海 the Final",
    prefecture: "鳥取県",
    area: "chugoku",
    date: "2023-08-27",
    comment: "砂丘、雪、低い雲。"
  },
  {
    id: "32",
    filename: shimane,
    title: "夜行列車の中",
    prefecture: "島根県",
    area: "chugoku",
    date: "2025-01-11",
    comment: "初めてのサンライズ出雲。"
  },
  {
    id: "33",
    filename: okayama,
    title: "曲線美。",
    prefecture: "岡山県",
    area: "chugoku",
    date: "2023-08-26",
    comment: "倉敷に寄り道。"
  },
  {
    id: "34",
    filename: hiroshima,
    title: "夜の厳島神社",
    prefecture: "広島県",
    area: "chugoku",
    date: "2025-05-17",
    comment: "野生の鹿がいっぱい。"
  },
  {
    id: "35",
    filename: yamaguchi,
    title: "宇部新川",
    prefecture: "山口県",
    area: "chugoku",
    date: "2025-05-18",
    comment: "エヴァンゲリオンの聖地巡礼。"
  },
  {
    id: "36",
    filename: tokushima,
    title: "香川⇒【徳島】（深夜）⇒和歌山",
    prefecture: "徳島県",
    area: "shikoku",
    date: "2023-08-27",
    comment: "夜たくさん散歩をした。"
  },
  {
    id: "37",
    filename: kagawa,
    title: "讃岐うどんには店ごとに個性があるようで。",
    prefecture: "香川県",
    area: "shikoku",
    date: "2023-08-26",
    comment: "瀬戸内海と穏やかな時間の流れ。"
  },
  {
    id: "40",
    filename: fukuoka,
    title: "志賀島の金印",
    prefecture: "福岡県",
    area: "kyushu",
    date: "2019-12-15",
    comment: "乃木坂の与田ちゃんの故郷なんて知らなかった。"
  }

]
</script>
<template>
  <PageTitle>Landscapes</PageTitle>
  <LayoutWrapper>
    <div class="landscapes">
      <div v-for="item in items" :key="item.id">
        <img
          :src="item.filename"
          @click="showModal(item)"
          alt="img"
        />
      </div>
    </div>
    <GalleryModal
      :isVisible="state.isVisible"
      :modalItem = state.setItem
      @close="closeTestModal"
      />
  </LayoutWrapper>
</template>
<style scope>
img{
  width: 150px;
  display: block;
}
.landscapes{
  display: flex;
  flex-wrap: wrap;
  width: 600px;
  margin: 0 auto;
  background-color: rgba(225, 231, 238, 0.5);
}
/* スマートフォン*/
@media only screen and (max-width: 750px) {
.landscapes {
    width: 300px;
    margin: 0 auto;
    background-color: rgba(225, 231, 238, 0.5);
  }
}
</style>
