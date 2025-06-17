<script setup lang="ts">
import 'revuekitz';
import 'revuekitz/dist/style.css' 
import {GridColumn,GridRow, TabPanel,ImgIcon} from 'revuekitz'
</script>

<template>
  <div class="container">
    <h1 class="text-center">DigLive</h1>
    <div class="flex">
      <img
        class="logo-img"
        src="/assets/images/projects/diglive/logo.png"
      />
    </div>
    <p>本アプリは、音楽ライブやクラブイベントの体験を記録できる、個人用のライブログアプリです。出演アーティスト、会場、チケット情報、感想など、イベントの詳細を日付ごとに残すことができます。お気に入りのアーティストはマスタ登録して管理でき、心を動かされた瞬間や熱狂の記憶を、自分だけの音楽ヒストリーとして積み重ねていきましょう。</p>
    <div class="features">
      <h2 class="text-center">主な特徴</h2>
      <ul class="features-list">
        <li>アーティスト情報の記録（出演アーティスト、共演者、プロフィール）</li>
        <li>ライブメモの記録（MC・感想・サプライズなど）</li>
        <li>チケット情報の紐付け（種類・座席・価格・購入方法）</li>
        <li>CSV出力によるデータバックアップや外部活用</li>
      </ul>
    </div>
    <section id="artist">
      <h2 class="text-center">アーティスト情報の記録機能</h2>
      <GridRow class="gridrow">
        <GridColumn class="gridcol" :lg_cols="3" :cols="6" :sm_cols="12">
           <TabPanel :tabs="['1', '2']">
              <template v-slot:content0>
                <div class="flex">
                  <img class="screen-img" src="/assets/images/projects/diglive/artist_list.png" />
                </div>
              </template>
              <template v-slot:content1>
                <div class="flex">
                  <img class="screen-img" src="/assets/images/projects/diglive/artist_update_form.png" />
                </div>
              </template>
            </TabPanel>
        </GridColumn>
        <GridColumn class="gridcol"  :lg_cols="3" :cols="6" :sm_cols="12">
          <p>アーティストを一覧で確認でき、登録済みの情報をすぐに把握できます。各アーティスト情報は追加はもちろん編集・削除にも対応しており、柔軟な管理が可能です。</p>
          <p>今後のライブ記録と連携することで、アーティストごとの記録を整理しやすくなります。</p>
        </GridColumn>
      </GridRow>
    </section>
    <section id="live">
      <h2 class="text-center">ライブ情報の記録機能</h2>
      <GridRow class="gridrow">
        <GridColumn class="gridcol"  :lg_cols="3" :cols="6" :sm_cols="12">
          <p>ライブを時系列で一覧表示でき、直感的に過去の記録を振り返ることができます。各ライブは追加はもちろん編集・削除にも対応しており、柔軟に管理できます。</p>
          <p>また、ライブごとに「リストメモ」や「チケット情報」などの詳細も記録でき、単なる記録にとどまらず、思い出をより豊かに残すことができます。</p>
        </GridColumn>
         <GridColumn class="gridcol" :lg_cols="3" :cols="6" :sm_cols="12">
            <TabPanel :tabs="['1', '2', '3', '4']">
              <template v-slot:content0>
                <div class="flex">
                  <img class="screen-img" src="/assets/images/projects/diglive/live_list.png" />
                </div>
              </template>
              <template v-slot:content1>
                <div class="flex">
                  <img class="screen-img" src="/assets/images/projects/diglive/live_update_form.png" />
                </div>
              </template>
              <template v-slot:content2>
                <div class="flex">
                  <img class="screen-img" src="/assets/images/projects/diglive/ticket_detail.png" />
                </div>
              </template>
              <template v-slot:content3>
                <div class="flex">
                  <img class="screen-img" src="/assets/images/projects/diglive/live_item.png" />
                </div>
              </template>
            </TabPanel>
        </GridColumn>
      </GridRow>
    </section>
        <section id="export">
      <h2 class="text-center">CSV出力録機能</h2>
      <GridRow class="gridrow">
        <GridColumn class="gridcol" :lg_cols="3" :cols="6" :sm_cols="12">
            <img class="screen-img" src="/assets/images/projects/diglive/setting_download.png" />
        </GridColumn>
        <GridColumn class="gridcol"  :lg_cols="3" :cols="6" :sm_cols="12">
          <p>CSVのエクスポートが出来ます。本アプリで登録したデータはデバイス内部に保存されるため、アプリ内のデータサイズが大きくなったときはエクスポートすることをおすすめします。年次を目安にエクスポートをすると良いでしょう。</p>
          <p>CSVは以下の2種類が出力可能です。（以下のリストをクリックするとCSV項目がご覧なられます。）</p>  
          <AccordionMenu
              :lists="[
                { title: '■ ライブ情報CSV', items: ['日付','開演時間','ライブ名','場所','チケット種別','席種','チケット金額','アーティスト名'] },
                { title: '■ ライブのリストメモCSV', items: ['ライブ名', 'アイテム'] }
              ]"
            />
        </GridColumn>
      </GridRow>
    </section>
    <section id="policy">
      <h2 class="text-center">プライバシーポリシー</h2>

      <article>
        <h3>■ 個人情報の利用</h3>
        <p>本アプリでは、通常利用において個人情報を収集することはありません。ただし、お問い合わせ対応などでメールアドレスなどをご提供いただく場合がございます。その際は、適切な目的に限って利用いたします。</p>
      </article>

      <article>
        <h3>■ 個人情報の提供</h3>
        <p>本アプリでは、ご提供いただいた個人情報を第三者に開示・提供することは一切ありません（法令に基づく場合を除きます）。</p>
      </article>

      <article>
        <h3>■ ユーザー入力データの扱い</h3>
        <p>本アプリでは、ユーザーが入力した情報はすべて端末内のSQLiteデータベースに保存されます。インターネットや外部サーバーとの通信は行っておらず、ユーザーの明示的な操作なしに情報が外部に送信されることはありません。</p>
      </article>

      <article>
        <h3>■ アプリの権限について</h3>
        <p>
          本アプリでは、ユーザーが記録したデータをCSV形式で出力する機能があります。この機能において、Android端末の内部ストレージ（Files）へアクセスし、ファイルの作成・保存を行うことがあります。これらの操作はユーザーが明示的に実行した場合に限られ、作成されたCSVファイルは端末内に保存され、外部に送信されることはありません。
        </p>
      </article>

      <article>
        <h3>■ アクセス解析・広告配信</h3>
        <p>本アプリではアクセス解析や広告配信等のための外部SDKは使用しておりません。ユーザー行動の追跡やトラッキング等は一切行っておりません。</p>
      </article>

    </section>

    <section id="term">
      <h2 class="text-center">利用規約</h2>

      <article>
        <h3>第1条 適用</h3>
        <p>本規約は、ユーザーとアプリ作成者との間で提供される本サービス（本アプリ）に関する一切の関係に適用されます。</p>
      </article>

      <article>
        <h3>第2条 サービスの提供・変更・停止</h3>
        <p>アプリ作成者は、ユーザーに事前に通知することなく、本サービスの内容を変更、追加または一時的・恒久的に中断することができます。</p>
      </article>

      <article>
        <h3>第3条 免責事項</h3>
        <p>本アプリの利用によって発生したユーザーの損害については、アプリ作成者に故意または重大な過失がある場合を除き、一切責任を負いません。</p>
      </article>

      <article>
        <h3>第4条 著作権</h3>
        <p>本アプリに含まれるすべてのコンテンツ、プログラム、画像等の知的財産権は、原則としてアプリ作成者に帰属します。無断転載・再配布を禁じます。</p>
      </article>

      <article>
        <h3>第5条 ユーザーの自己責任</h3>
        <p>本アプリに入力されたデータは端末に保存され、ユーザー自身の責任で管理されるものとします。万一データが端末の故障・紛失等により消失した場合でも、アプリ作成者は一切の責任を負いません。</p>
      </article>

      <article>
        <h3>第6条 利用規約の変更</h3>
        <p>アプリ作成者は、必要に応じて本規約を変更することがあります。変更後の内容はアプリ内またはWeb上で告知し、効力は告知した時点から発生します。</p>
      </article>

    </section>

    <p class="links">
      <NuxtLink to="/projects/diglive/components" class="nuxt-link">コンポーネント一覧はこちら</NuxtLink>
    </p>
  </div>
</template>

<style scoped>
.text-center{
 text-align: center;
}
h2{
  padding-top: 5px;
}
.gridcol{
  width: 300px;
}
.screen-img{
  display: block;
  width: 200px;
  height: auto;
  margin: 5px;
}
.logo-img{
  display: block;
  width: 280px;
  height: auto;
  margin: 5px;
}
.flex{
  display: flex;
  justify-content: center;
}
.container {
  max-width: 720px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fefefe;
  border-radius: 12px;
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
