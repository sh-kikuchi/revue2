<script setup>
import { ref } from 'vue';

//buttons(3)
import BasicButton from '@/components/global/buttons/BasicButton.vue';
import LinkButton from '@/components/global/buttons/LinkButton.vue';
import PushButton from '@/components/global/buttons/PushButton.vue';

//fields(12)
import CheckBoxField from "@/components/global/fields/CheckBoxField.vue";
import ColorField from "@/components/global/fields/ColorField.vue";
import DateField from "@/components/global/fields/DateField.vue";
import FileField from "@/components/global/fields/FileField.vue";
import MoneyField from "@/components/global/fields/MoneyField.vue";
import NumberField from "@/components/global/fields/NumberField.vue";
import RadioField from "@/components/global/fields/RadioField.vue";
import RangeField from "@/components/global/fields/RangeField.vue";
import SelectField from "@/components/global/fields/SelectField.vue";
import TextField from "@/components/global/fields/TextField.vue";
import Textarea from "@/components/global/fields/TextArea.vue";
import ToggleSwitch from "@/components/global/fields/ToggleSwitch.vue";

// layouts(3)
import Row    from "@/components/global/layouts/grid/Row";
import Column from "@/components/global/layouts/grid/Column";
import Wrapper from '~/components/global/layouts/Wrapper.vue';

// navigations(5)
import Breadcrumb from '@/components/global/navigations/Breadcrumb.vue';
import Tab from '@/components/global/navigations/Tab.vue';
import NavBar from '@/components/global/navigations/NavBar.vue';
import NavListItem from '@/components/global/navigations/NavListItem.vue';
import Pagination from "@/components/global/navigations/Pagination.vue";

// displays (5)
import Footer from '@/components/global/displays/Footer.vue';
import Header from '@/components/global/displays/Header.vue';
import PageTitle from '@/components/global/displays/PageTitle.vue';
import Chip  from '@/components/global/displays/Chip.vue';
import Loading from '@/components/global/displays/Loading.vue';

// tables(1)
import DataTable from '@/components/global/tables/DataTable.vue';

//lists(3)
import Accordion from "@/components/global/lists/Accordion.vue"
import BasicList from "@/components/global/lists/BasicList.vue";
import TreeList from '@/components/global/lists/TreeList.vue';

// dialogs（1）
import Popup from '@/components/global/dialogs/Popup.vue';

// images (2)
import Avatar from '@/components/global/images/Avatar.vue';
import Icon from '@/components/global/images/Icon.vue'

import ReleaseNote from '@/assets/json/relese_note.json';
import { mdiInformationOutline} from '@mdi/js';
import mylogo   from '@/assets/images/logo/s_logo.png';

const text = ref('text');
const number = ref(100);
const money = ref('djxfhdks');
const checkedItem = ref('');
const selectedItem = ref('A');
const array = ref(["A", "B", "C"]);
const rangeValue = ref('');
const fileData = ref(null);
const selectedColor = ref('');
const dateValue = ref('');

/*======Pagination:start=====*/
const items = ref([
    {"id": 1, "name_jp": "コーヒー", "name_en": "coffee"},
    {"id": 2, "name_jp": "エスプレッソ", "name_en": "espresso"},
    {"id": 3, "name_jp": "カプチーノ", "name_en": "cappuccino"},
    {"id": 4, "name_jp": "カフェモカ", "name_en": "mocha"},
    {"id": 5, "name_jp": "ティー", "name_en": "tea"},
    {"id": 6, "name_jp": "サンドイッチ", "name_en": "sandwich"},
    {"id": 7, "name_jp": "ホットドック", "name_en": "hotdog"},
    {"id": 8, "name_jp": "オムレツ", "name_en": "omelette"},
    {"id": 9, "name_jp": "サラダ", "name_en": "salad"},
    {"id": 10, "name_jp": "カレー", "name_en": "curry"},
]);

const lists = ref(
  [
    {
      title : "About",
      items : ["本画面のこと。ここではRe:Vueのトリセツをホームページ風にまとめたページとなっています。以前に個人で作ったことあるデザインをそのまま踏襲してみました。"]
    },
    {
      title : "MyApps",
      items : ["個人開発で制作したアプリを紹介するページです。個人だけでなく、ユニットを組んで作ったものもここで紹介出来ると良きだと思ってます。"]
    },
    {
      title : "Techs",
      items : ["自分がプログラミングで学習してきたことをマークダウン形式の記事に記しております。Vue.jsやLaravelなど、言語ごとに記事は分類されています。"]
    },
    {
      title : "Designs",
      items : ["Vue.jsのスタイルレンダリングによって、CSSの効果を可視化出来るようにしました。画像加工や色相、要素の配置など様々なスタイルを用意しております。"]
    }
  ],
);

const displayItems = ref([]);

const getDispItems = (dispArray) => {
  displayItems.value = dispArray;
};
/*======Pagination:end=====*/

const getFileData = (targetFile) => {
  console.log(targetFile);
  fileData.value = targetFile.name;
};

/*======NavBar======*/
const navBarVisible = ref(false);
const showNavBar = () => {
  navBarVisible.value = true;
};

const closeNavBar = () => {
  navBarVisible.value = false;
};


</script>
<template>
  <PageTitle title="RevueKitz" />
  <Tab
      :tabs = "[
        'buttons',
        'fields',
        'layouts',
        'navigations',
        'displays',
        'tables',
        'lists',
        'dialogs',
        'images'
      ]"
      :width = 1024
  >
      <template v-slot:content0>
        <section>
          <h2 class="mb-3">buttons</h2>
          <div>
            <div style="margin-top: 15px; margin-bottom: 15px;">
              <label class="mr-2">LinkButton</label>
              <BasicButton
                type  = "button"
                class = "basic-button"
              >BasicButton</BasicButton>
            </div>
          </div>
          <div style="margin-top: 15px; margin-bottom: 15px;">
            <label class="mr-2">PushButton</label>
            <PushButton
              type   = "button"
              background-color = "red"
              font-color = "white"
              v-on:click="add"
            >PushButton</PushButton>
          </div>
          <div>
            <div style="margin-top: 15px; margin-bottom: 15px;">
              <label class="mr-2">LinkButton</label>
              <LinkButton>LinkButton</LinkButton>
            </div>
          </div>
        </section>
      </template>
      <template v-slot:content1>
        <section>
          <label>TextField</label>
          <div>
            <TextField 
              v-model:binding-value="text" 
            />
          </div>
          <div>{{ text }}</div>
        </section>
        <section>
          <label>NumberField</label>
          <div>
            <NumberField
              v-model:number ="number" 
            />
          </div>
          <div>{{ number }}</div>
        </section>
        <section>
          <label>MoneyField</label>
          <div>
            <MoneyField
              v-model:money ="money" 
            />
          </div>
          <div>{{ money }}</div>
        </section>
        <section>
          <label>RadioField</label>
          <div>
            <RadioField 
              :items = array
              accentColor= "red"
              v-model:radio="selectedItem" 
            />  
          </div>
          <div>{{ selectedItem }}</div>
        </section>
        <section>
          <label>CheckBoxField</label>
          <div>
            <CheckBoxField 
              item = "ねこ"
              label = "dog"
              accentColor= "red"
              isChecked = true
              v-model:checked="checkedItem" 
            />  
          </div>
          <div>{{ checkedItem }}</div>
        </section>
        <section>
          <label>SelectField</label>
          <div>
            <SelectField 
              v-model:selected-item="selectedItem" 
            />  
          </div>
          <div>{{ selectedItem }} </div>
        </section>
        <section>
          <label>RadioField</label>
          <div>
            <RangeField
              v-model:range-value="rangeValue" 
            />  
          </div>
          <div> {{ rangeValue }} </div>
        </section>
        <section>
          <label>FileField</label>
          <div style="margin-top: 15px; margin-bottom: 15px;">
            <FileField
              @fileData ="getFileData" 
            />
          </div>
          <div> {{ fileData }} </div>
        </section>
        <section>
          <label>ColorField</label>
          <div style="margin-top: 15px; margin-bottom: 15px;">
            <ColorField
              v-model:selected-color="selectedColor" 
            />
          </div>
          <div> {{ selectedColor }} </div>
        </section>
        <section>
          <label>DateField</label>
          <div style="margin-top: 15px; margin-bottom: 15px;">
            <DateField
              type="month"
              v-model:date-value="dateValue" 
            />
          </div>
          <div> {{ dateValue }} </div>
        </section>
        <section>
          <label>Textarea</label>
          <div style="margin-top: 15px; margin-bottom: 15px;">
            <Textarea>fgdfgdf</Textarea>
          </div>
        </section>
        <section>
          <label>ToggleSwitch</label>
          <div style="margin-top: 15px; margin-bottom: 15px;">
            <ToggleSwitch size="small" />
          </div>
        </section>
      </template>
      <template v-slot:content2>
        <section>
          <label>Row/Column(Grid System)</label>
          <Row>
            <Column :cols="6" :sm_cols="12">
              <p>Left</p>
            </Column>
            <Column :cols="6" :sm_cols="12">
              <p>Right</p>
            </Column>
          </Row>   
        </section>
        <section>
          <label>Wrapper</label>
          <Wrapper style="border: 1px solid black;">
            Wrapper Area
          </Wrapper>   
        </section>
      </template>
      <template v-slot:content3>
        <section>
          <h2>Breadcrumb</h2>
          <div>
            <Breadcrumb />
          </div>
        </section>
        <section>
          <h2>NavBar</h2>
          <div>
            <div class="three-lines mr-2" @click="showNavBar">&equiv;</div>
          </div>
          <div>
            <NavBar
              :isVisible="navBarVisible" 
              @close="closeNavBar"
            >   <NavListItem
                  to= ''
                  :icon='mdiInformationOutline'
                  linkName='TEST'
                />
            </NavBar>
          </div>
        </section>
        <section>
          <h2>Pagination</h2>
          <div>
            <ul>
              <li v-for="item in displayItems" :key="item.id">
                <span>{{ item.name_jp }}</span>
              </li>
            </ul>
          </div>
          <div>
            <Pagination
              :items ="items"
              steps=2
              @handleAction="getDispItems"
            ></Pagination>
          </div>
        </section>
      </template>
      <template v-slot:content4>
        <section>
          <Header>
            <h1 class="ml-2">Re:Vue</h1>
            <div></div>
          </Header>
        </section>
        <section>
          <label>Footer</label>
          <div style="margin-top: 15px; margin-bottom: 15px;">
            <Footer>TEST</Footer>
          </div>
        </section>
        <section>
          <label>Chip</label>
          <div style="margin-top: 15px; margin-bottom: 15px;">
            <Chip
              class="mx-1 mt-1" 
              content="skill" 
            />
          </div>
        </section>
        <section>
          <h2>Loading</h2>
          <div>
            <Loading>
              <img src="~@/assets/images/logo/s_logo.png" />
              <div class="loading_text">Loading</div>
            </Loading>
          </div>
        </section>
      </template>
      <template v-slot:content5>
        <section>
          <label>DataTable</label>
          <div style="margin-top: 15px; margin-bottom: 15px;">
            <DataTable
              :items= "ReleaseNote"
              :seach_mode=true
            />
          </div>
        </section>
      </template>
      <template v-slot:content6>
        <section>
          <h2>Accordion</h2>
          <div>
            <Accordion :lists = lists />
          </div>
        </section>
        <section>
          <h2>Basic Lists</h2>
          <div>
            <BasicList />
          </div>
        </section>
        <section>
          <label>TreeList</label>
          <div style="margin-top: 15px; margin-bottom: 15px;">
            <TreeList></TreeList>
          </div>
        </section>
      </template>
      <template v-slot:content7>
        <section>
          <label>Pop up</label>
          <div style="margin-top: 15px; margin-bottom: 15px;">
            <Popup>
              <template v-slot:popupBtn>
                  <!-- スロット1 のコンテンツ -->
                  <div class="andmore"><button>TEST</button></div>
              </template>
              <template v-slot:popupContent>
                <!-- スロット2 のコンテンツ -->
                 <div class="pa-2">TESTNAN</div>
              
              </template>
            </Popup>
          </div>
        </section>
      </template>
      <template v-slot:content8>
        <section>
          <label>アバター</label>
          <div style="margin-top: 15px; margin-bottom: 15px;">
            <Avatar :imgFile = "mylogo" style="width: 20px;"/>
          </div>
        </section>
        <section>
          <h2>アイコン</h2>
          <div>
            <Icon class="icon-wrapper" :path="icon" :size=26 />
          </div>
        </section>
      </template>
    </Tab>
  </template>

<style>
  section{
    margin: 20px;
  }
  input[type="button"]{
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