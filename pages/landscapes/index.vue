<template>
  <PageTitle title="Landscapes" />
  <Wrapper>
    <v-row class="landscapes">
      <v-col cols="3" class="pa-0" v-for="item in items" :key="item.id">
      <img
        :src="item.filename"
        @click="showModal(item)"
        alt="img"
      />
      </v-col>
    </v-row>
    <GalleryModal
      :isVisible="state.isVisible"
      :modalItem = state.setItem
      @close="closeTestModal"
      />
  </Wrapper>
</template>

<script setup>
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
import shiga from '@/assets/images/landscapes/prefectures/toyama.jpg'
import fukuoka from '@/assets/images/landscapes/prefectures/fukuoka.jpg'
import toyama from '@/assets/images/landscapes/prefectures/toyama.jpg'

import Wrapper from '~~/components/commons/Wrapper.vue'
import PageTitle from '~~/components/commons/PageTitle.vue'
import GalleryModal from '~~/components/landscapes/GalleryModal.vue'

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
    id: "1",
    filename: hokkaido,
    title: "函館の坂本さん",
    prefecture: "北海道",
    area: "hokkaido",
    date: "2017-02-20",
    comment:"函館にそんなに所縁がある訳ではないけれど、こうしてパイを構いながら待っている。"
  },
  {
    id: "2",
    filename: fukushima,
    title: "東北絆まつり",
    prefecture: "福島県",
    area: "tohoku",
    date: "2019-06-01",
    comment:"GLAY EXPO以降、行ってみたかった東北六魂祭が形を変えて絆まつりに。福島はわらじ祭り。"
  },
  {
    id: "3",
    filename: akita,
    title: "厳冬の日本海シリーズvol.2",
    prefecture: "秋田県",
    area: "tohoku",
    date: "2020-02-23",
    comment:"田沢湖の吹雪で死にそうになる。"
  },
  {
    id: "4",
    filename: miyagi,
    title: "グリコワゴン Ver.930",
    prefecture: "宮城県",
    area: "tohoku",
    date: "2014-09-20",
    comment:"初めてのGLAY LIVE。ちょっと観光もしたかった。それより写真後方の人間の多さ。"
  },
  {
    id: "5",
    filename: iwate,
    title: "浄土ヶ浜",
    prefecture: "岩手県",
    area: "tohoku",
    date: "2022-06-21",
    comment:"御台場展望台から見ると、海が綺麗。岩の削れ具合とかも好き。"
  },
  {
    id: "6",
    filename: aomori,
    title: "豪雨、館のねぶた",
    prefecture: "青森県",
    area: "tohoku",
    date: "2018-08-24",
    comment:"GLAYライブ直前、W台風の懸念でそわそわしながら鑑賞。フェリーが出るんかいな…と。"
  },
  {
    id: "7",
    filename: kanagawa,
    title: "アヒル口",
    prefecture: "神奈川県",
    area: "kanto",
    date: "2022-01-02",
    comment:"7年ぶりに菅原公に会ってきました。学術をめぐっていっぱい喧嘩したね。"
  },
  {
    id: "8",
    filename: chiba,
    title: "二人セゾン",
    prefecture: "千葉県",
    area: "kanto",
    date: "2022-07-31",
    comment:"幕張、日陰がなく、蜂が多い。"
  },
  {
    id: "9",
    filename: saitama,
    title: "埼玉の水。",
    prefecture: "埼玉県",
    area: "kanto",
    date: "2019-08-18",
    comment:"人工湖だけど。"
  },
  {
    id: "10",
    filename: gunma,
    title: "【終電、夜に駆ける vol.1】深夜のプログラミング逃避。",
    prefecture: "群馬県",
    area: "kanto",
    date: "2021-03-30",
    comment:"城跡に県庁あるある。夜に見に行くことではない。結局、ファミレスでプログラムを書く病に陥るし。嗚呼、逃げたい。"
  },
  {
    id: "11",
    filename: tochigi,
    title: "【終電、夜に駆ける vol.2】東京ではない方の小金井",
    prefecture: "栃木県",
    area: "kanto",
    date: "2022-03-19",
    comment:"終電で向かった先は無。タクシーさえもなく、文字だけが佇む。"
  },
  {
    id: "12",
    filename: aichi,
    title: "早朝の城。",
    prefecture: "愛知県",
    area: "chubu",
    date: "2020-01-19",
    comment:"家康が築城…、そっか尾張徳川家…。"
  },
  {
    id: "13",
    filename: shizuoka,
    title: "沼津のシーラカンスくん。",
    prefecture: "静岡県",
    area: "chubu",
    date: "2019-08-30",
    comment:"グソクムシも可愛かったんだよな。"
  },
  {
    id: "14",
    filename: gifu,
    title: "琵琶湖への漂流",
    prefecture: "岐阜県",
    area: "chubu",
    date: "2022-03-11",
    comment:"愛知・岐阜・滋賀をまとめて1日で。耳に水音を入れてストレスを削っとかないと思って。彦根城はなかなか良き。"
  },
  {
    id: "15",
    filename: nagano,
    title: "車山の岩々",
    prefecture: "長野県",
    area: "chubu",
    date: "2019-08-05",
    comment:"トンボが沢山いた記憶がある。岩に特に思い入れはない。"
  },
  {
    id: "16",
    filename: yamanashi,
    title: "夜勤明け、ワイン買いにゆく。",
    prefecture: "山梨県",
    area: "chubu",
    date: "2021-03-23",
    comment:"グラン・シャンモリ 樽熟成マスカット・ベーリーA 2018(盛田甲州ワイナリー）。タートヴァンでワインの色を見せたところで写真加工してるから。"
  },
  {
    id: "17",
    filename: fukui,
    title: "小熊猫",
    prefecture: "福井県",
    area: "chubu",
    date: "2019-01-10",
    comment:"気高そうだけど、そういう所がかわいいのだ"
  },
  {
    id: "18",
    filename: toyama,
    title: "厳冬の日本海シリーズvol.3",
    prefecture: "富山県",
    area: "chubu",
    date: "2021-12-11",
    comment: "クロムクロの聖地巡礼。5周年おめでとう。富山駅から空港まで歩けたのは良かったが、寒さと持て余した時間に苦しんだ。それでも、きときとから飛び立った時の雲のもくもく感は流石、日本海側（なのか？）"
  },
  {
    id: "19",
    filename: osaka,
    title: "難波の獅子さん",
    prefecture: "大阪府",
    area: "kinki",
    date: "2019-03-20",
    comment: "顎関節症なんだよなーと思いながら…。"
  },
  {
    id: "20",
    filename: kyoto,
    title: "京都北区",
    prefecture: "京都",
    area: "kinki",
    date: "2022-06-01",
    comment: "渡月橋～金閣寺～上賀茂神社と歩いて移動したものですから、、、トラウマです。"
  },
  {
    id: "21",
    filename: shiga,
    title: "養老乃瀧ではない、養老の滝へ",
    prefecture: "滋賀県",
    area: "kinki",
    date: "2022-03-11",
    comment: "愛知・岐阜・滋賀をまとめて1日で。養老乃瀧に行きたかったはずだが、此処へたどり着く。滝壺へ落ちる水と壺の水のうねりは魅でした。"
  },
  {
    id: "99",
    filename: fukuoka,
    title: "志賀島の金印",
    prefecture: "滋賀県",
    area: "kyushu",
    date: "2019-12-15",
    comment: "乃木坂の与田ちゃんの故郷なんて知らなかった、このころ。"
  },
]

</script>
<style scope>
img{
  width: 150px;
  display: block;
}
.landscapes{
  width: 600px;
  margin: 0 auto;
  background-color: rgba(225, 231, 238, 0.5);
}
</style>
