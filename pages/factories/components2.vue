<script setup>
import { onMounted, ref } from 'vue'

// buttons
import { BasicButton, LinkButton, PushButton } from 'revuekitz';

// fields
import {
  CheckBoxField,
  ColorField,
  DateField,
  FileField,
  MoneyField,
  NumberField,
  RadioField,
  RangeField,
  SelectField,
  TextField,
  // TextArea,
  ToggleSwitch
} from 'revuekitz';

// layouts
import { GridColumn, GridRow, LayoutWrapper } from 'revuekitz';

// navigations
import {
  BreadcrumbList,
  TabPanel,
  NavBar,
  NavListItem,
  PaginateNavigation
} from 'revuekitz';

// displays
import {
  LayoutFooter,
  LayoutHeader,
  PageTitle,
  ChipText,
  CardFlame,
  LoadingLoader
} from 'revuekitz';

// tables
import { DataTable } from 'revuekitz';

// lists
import { AccordionMenu, BasicList, TreeList } from 'revuekitz';

// dialogs
import { PopupDialog, ModalDialog } from 'revuekitz';

// icons
import { ImgIcon, SvgIcon } from 'revuekitz';

import ReleaseNote from './assets/json/relese_note.json'
import { mdiInformationOutline } from '@mdi/js'

import 'revuekitz/dist/style.css'; 

const text = ref('text')
const text2 = ref('text2')
const number = ref(100)
const money = ref('djxfhdks')
const checkedItem = ref('')
const selectedItem = ref('A')
const array = ref(['A', 'B', 'C'])
const rangeValue = ref('')
const fileData = ref(null)
const selectedColor = ref('')
const dateValue = ref('')
const toggleSwitchChecked = ref(false)
/*======PaginateNavigation:start=====*/
const items = ref([
  { id: 1, name_jp: 'コーヒー', name_en: 'coffee' },
  { id: 2, name_jp: 'エスプレッソ', name_en: 'espresso' },
  { id: 3, name_jp: 'カプチーノ', name_en: 'cappuccino' },
  { id: 4, name_jp: 'カフェモカ', name_en: 'mocha' },
  { id: 5, name_jp: 'ティー', name_en: 'tea' },
  { id: 6, name_jp: 'サンドイッチ', name_en: 'sandwich' },
  { id: 7, name_jp: 'ホットドック', name_en: 'hotdog' },
  { id: 8, name_jp: 'オムレツ', name_en: 'omelette' },
  { id: 9, name_jp: 'サラダ', name_en: 'salad' },
  { id: 10, name_jp: 'カレー', name_en: 'curry' }
])

const lists = ref([
  {
    title: 'About',
    items: [
      '本画面のこと。ここではRe:Vueのトリセツをホームページ風にまとめたページとなっています。以前に個人で作ったことあるデザインをそのまま踏襲してみました。'
    ]
  },
  {
    title: 'MyApps',
    items: [
      '個人開発で制作したアプリを紹介するページです。個人だけでなく、ユニットを組んで作ったものもここで紹介出来ると良きだと思ってます。'
    ]
  },
  {
    title: 'Techs',
    items: [
      '自分がプログラミングで学習してきたことをマークダウン形式の記事に記しております。Vue.jsやLaravelなど、言語ごとに記事は分類されています。'
    ]
  },
  {
    title: 'Designs',
    items: [
      'Vue.jsのスタイルレンダリングによって、CSSの効果を可視化出来るようにしました。画像加工や色相、要素の配置など様々なスタイルを用意しております。'
    ]
  }
])

const displayItems = ref([])

const getDispItems = (dispArray) => {
  displayItems.value = dispArray
}
/*======PaginateNavigation:end=====*/

const getFileData = (targetFile) => {
  console.log(targetFile)
  fileData.value = targetFile.name
}

/*======NavBar======*/
const navBarVisible = ref(false)
const showNavBar = () => {
  navBarVisible.value = true
}

const closeNavBar = () => {
  navBarVisible.value = false
}

/*======Modal:start=====*/
const isModalVisible = ref(false)

const toggleModal = () => {
  isModalVisible.value = !isModalVisible.value
}

const closeModal = () => {
  isModalVisible.value = false
}

/*=======Modal:end======*/

const styleStr = 'background-color:aqua; display:inline'

const logoSrc = '/src/assets/images/s_logo.png'
</script>
<template>
  <div>
    <div style="width: 1024%">
      <PageTitle>RevueKitz</PageTitle>
      <TabPanel
        :tabs="[
          'buttons',
          'fields',
          'layouts',
          'navigations',
          'displays',
          'tables',
          'lists',
          'dialogs',
          'icons'
        ]"
        style="width: 860px; height: 100vh"
      >
        <template v-slot:content0>
          <section>
            <h2 class="mb-3">buttons</h2>
            <div>
              <div style="margin-top: 15px; margin-bottom: 15px">
                <h3 class="mr-2">BasicButton</h3>
                <BasicButton
                  id="unique-button-id"
                  class="custom-class"
                  style="color: white; background-color: blue"
                  :styleReset="false"
                  name="custom-button"
                  type="submit"
                  onclick="alert('neko')"
                >
                  Submit
                </BasicButton>
              </div>
            </div>
            <div style="margin-top: 15px; margin-bottom: 15px">
              <h3 class="mr-2">PushButton</h3>
              <PushButton type="button" class="nekotaro" v-on:click="add">PushButton</PushButton>
            </div>
            <div>
              <div style="margin-top: 15px; margin-bottom: 15px">
                <h3 class="mr-2">LinkButton</h3>
                <LinkButton>LinkButton</LinkButton>
              </div>
            </div>
          </section>
        </template>
        <template v-slot:content1>
          <section>
            <h3>TextField</h3>
            <div>
              <TextField v-model:binding-value="text" />
              <TextField v-model:binding-value="text2" />
            </div>
            <div>{{ text }}</div>
            <div>{{ text2 }}</div>
          </section>
          <section>
            <h3>NumberField</h3>
            <div>
              <NumberField v-model:number="number" />
            </div>
            <div>{{ number }}</div>
          </section>
          <section>
            <h3>MoneyField</h3>
            <div>
              <MoneyField v-model:money="money" />
            </div>
            <div>{{ money }}</div>
          </section>
          <section>
            <h3>RadioField</h3>
            <div>
              <RadioField :items="array" accentColor="red" v-model:radio="selectedItem" />
            </div>
            <div>{{ selectedItem }}</div>
          </section>
          <section>
            <h3>CheckBoxField</h3>
            <div>
              <CheckBoxField
                item="ねこ"
                label="dog"
                accentColor="red"
                isChecked="true"
                v-model:checked="checkedItem"
              />
            </div>
            <div>{{ checkedItem }}</div>
          </section>
          <section>
            <h3>SelectField</h3>
            <div>
              <SelectField v-model:selected-item="selectedItem" />
            </div>
            <div>{{ selectedItem }}</div>
          </section>
          <section>
            <h3>RadioField</h3>
            <div>
              <RangeField v-model:range-value="rangeValue" />
            </div>
            <div>{{ rangeValue }}</div>
          </section>
          <section>
            <h3>FileField</h3>
            <div style="margin-top: 15px; margin-bottom: 15px">
              <FileField .fileData="getFileData" />
            </div>
            <div>{{ fileData }}</div>
          </section>
          <section>
            <h3>ColorField</h3>
            <div style="margin-top: 15px; margin-bottom: 15px">
              <ColorField v-model:selected-color="selectedColor" />
            </div>
            <div>{{ selectedColor }}</div>
          </section>
          <section>
            <h3>DateField</h3>
            <div style="margin-top: 15px; margin-bottom: 15px">
              <DateField type="month" v-model:date-value="dateValue" />
            </div>
            <div>{{ dateValue }}</div>
          </section>
          <section>
            <h3>Textarea</h3>
            <div style="margin-top: 15px; margin-bottom: 15px">
              <!-- <Textarea>fgdfgdf</Textarea> -->
            </div>
          </section>
          <section>
            <h3>ToggleSwitch</h3>
            <div style="margin-top: 15px; margin-bottom: 15px">
              <ToggleSwitch
                size="S"
                backgroundColor="red"
                v-model:binding-value="toggleSwitchChecked"
              />
              <div>チェック状態：{{ toggleSwitchChecked }}</div>
            </div>
          </section>
        </template>
        <template v-slot:content2>
          <section>
            <h3>GridRow/GridColumn(Grid System)</h3>
            <GridRow>
              <GridColumn :cols="6" :sm_cols="12">
                <p>Left</p>
              </GridColumn>
              <GridColumn :cols="6" :sm_cols="12">
                <p>Right</p>
              </GridColumn>
            </GridRow>
          </section>
          <section>
            <h3>LayoutWrapper</h3>
            <LayoutWrapper style="border: 1px solid black"> LayoutWrapper Area </LayoutWrapper>
          </section>
        </template>
        <template v-slot:content3>
          <section>
            <h2>BreadcrumbList</h2>
            <div>
              <BreadcrumbList class="nekotaro" />
            </div>
          </section>
          <section>
            <h2>NavBar</h2>
            <div>
              <div class="three-lines mr-2" @click="showNavBar">&equiv;</div>
            </div>
            <div>
              <NavBar :isVisible="navBarVisible" @close="closeNavBar">
                <NavListItem to="" :icon="mdiInformationOutline" linkName="TEST" />
              </NavBar>
            </div>
          </section>
          <section>
            <h2>PaginateNavigation</h2>
            <div>
              <ul>
                <li v-for="item in displayItems" :key="item.id">
                  <span>{{ item.name_jp }}</span>
                </li>
              </ul>
            </div>
            <div>
              <PaginateNavigation
                :items="items"
                steps="2"
                @handleAction="getDispItems"
              ></PaginateNavigation>
            </div>
          </section>
        </template>
        <template v-slot:content4>
          <section>
            <h3>Card</h3>
            <CardFlame> TEST </CardFlame>
          </section>
          <section>
            <LayoutHeader>
              <h1 class="ml-2">Re:Vue</h1>
              <div></div>
            </LayoutHeader>
          </section>
          <section>
            <h3>LayoutFooter</h3>
            <div style="margin-top: 15px; margin-bottom: 15px">
              <LayoutFooter><div>Revue</div></LayoutFooter>
            </div>
          </section>
          <section>
            <h3>ChipText</h3>
            <div style="margin-top: 15px; margin-bottom: 15px">
              <ChipText class="mx-1 mt-1">ChipText</ChipText>
            </div>
          </section>
          <section>
            <h2>LoadingLoader</h2>
            <div>
              <LoadingLoader>
                <img :src="logoSrc" />
                <div class="loading_text">LoadingLoader</div>
              </LoadingLoader>
            </div>
          </section>
        </template>
        <template v-slot:content5>
          <section>
            <h3>DataTable</h3>
            <div style="margin-top: 15px; margin-bottom: 15px">
              <DataTable :items="ReleaseNote" :seach_mode="true" />
            </div>
          </section>
        </template>
        <template v-slot:content6>
          <section>
            <h2>AccordionMenu</h2>
            <div>
              <AccordionMenu :lists="lists" />
            </div>
          </section>
          <section>
            <h2>Basic Lists</h2>
            <div>
              <BasicList />
            </div>
          </section>
          <section>
            <h3>TreeList</h3>
            <div style="margin-top: 15px; margin-bottom: 15px">
              <TreeList></TreeList>
            </div>
          </section>
        </template>
        <template v-slot:content7>
          <section>
            <h3>Pop up</h3>
            <div style="margin-top: 15px; margin-bottom: 15px">
              <PopupDialog>
                <template v-slot:popupBtn>
                  <!-- スロット1 のコンテンツ -->
                  <div class="andmore"><button>TEST</button></div>
                </template>
                <template v-slot:popupContent>
                  <!-- スロット2 のコンテンツ -->
                  <div class="pa-2">TESTNAN</div>
                </template>
              </PopupDialog>
            </div>
          </section>
          <section>
            <h3>Modal</h3>
            <div style="margin-top: 15px; margin-bottom: 15px">
              <ModalDialog :is-visible="isModalVisible" @close="closeModal">
                <h4>タイトル</h4>
                <p>TEST</p>
              </ModalDialog>
              <button @click="toggleModal">Open Modal</button>
              <button v-if="isModalVisible" @click="closeModal">Close Modal</button>
            </div>
          </section>
        </template>
        <template v-slot:content8>
          <section>
            <h3>Img Icon</h3>
            <div style="display: flex; height: 100px; margin-top: 15px; margin-bottom: 20px">
              <ImgIcon :imgFile="logoSrc" size="64" />
              <div>TEST</div>
            </div>
          </section>
          <section>
            <h2>Svg Icon</h2>
            <div>
              <SvgIcon class="icon-wrapper" :path="mdiInformationOutline" size="64" />
            </div>
          </section>
        </template>
      </TabPanel>
    </div>
  </div>
</template>

<style>
.nekotaro {
  background-color: aquamarine;
}
section {
  margin: 20px;
}
input[type='button'] {
  width: 50px;
  height: 50px;
}
.loading img {
  display: block;
  width: 30px;
  height: 30px;
  margin: 0 auto;
  animation: spin 2s linear infinite;
}
.loading_text {
  text-align: center;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
