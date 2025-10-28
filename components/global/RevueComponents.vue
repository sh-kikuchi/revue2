<script setup lang="ts">
import { ref } from 'vue'
import { mdiInformationOutline } from '@mdi/js'
import { mdiAccount } from '@mdi/js'
import 'revuekitz/dist/style.css'

// buttons(3)
import { BasicButton } from 'revuekitz'
import { LinkButton } from 'revuekitz'
import { PushButton } from 'revuekitz'

// displays(7)
import { CardFlame } from 'revuekitz'
import { ChipText } from 'revuekitz'
import { CustomMessage } from 'revuekitz'
import { LoadingLoader } from 'revuekitz'
import { ModalDialog } from 'revuekitz'
import { PageTitle } from 'revuekitz'
import { TabPanel } from 'revuekitz'
import { ToolTip } from 'revuekitz'

// fields(12)
import { CheckBoxField } from 'revuekitz'
import { ColorField } from 'revuekitz'
import { DateField } from 'revuekitz'
import { FileDnd } from 'revuekitz'
import { FileField } from 'revuekitz'
import { MoneyField } from 'revuekitz'
import { NumberField } from 'revuekitz'
import { RadioField } from 'revuekitz'
import { RangeField } from 'revuekitz'
import { SelectField } from 'revuekitz'
import { TextField } from 'revuekitz'
import { MultiLineField } from 'revuekitz'
import { ToggleSwitch } from 'revuekitz'

// icons(2)
import { ImgIcon } from 'revuekitz'
import { SvgIcon } from 'revuekitz'

// layouts(7)
import { GridColumn } from 'revuekitz'
import { GridRow } from 'revuekitz'
import { LayoutFooter } from 'revuekitz'
import { LayoutHeader } from 'revuekitz'
import { LayoutWrapper } from 'revuekitz'
import { NavBar } from 'revuekitz'
import { NavBarItem } from 'revuekitz'

// lists(5)
import { AccordionMenu } from 'revuekitz'
import { BasicList } from 'revuekitz'
import { BreadcrumbList } from 'revuekitz'
import { PaginateList } from 'revuekitz'
import { TreeList } from 'revuekitz'

// tables(1)
import { DataTable } from 'revuekitz'

// calendars(1)
import { EventCalendar } from 'revuekitz'

/* ======props====== */
const props = defineProps<{
  component: string
}>();

/* ======interface====== */
interface File extends Blob {
  readonly name: string;
}

interface Item {
   id: number;
  name_en: string;
}


/*======Fields:start=====*/
const text = ref('text')
const text2 = ref('text2')
const numberValue = ref(100)
const moneyValue = ref(50)
const checkedItem = ref('')
const checkBoxChecked = ref(false)
const radioCheckedItem = ref('')
const rangeItems = ref(['Option 1', 'Option 2', 'Option 3'])
const rangeValue = ref(50)
const selectedItem = ref('A')
const selectedFiles = ref<File[]>([])
const fileData = ref<File[]>([]);
const selectedColor = ref('')
const dateValue = ref('2024-07-15')
const longText = ref('jdfghfjkdghkdfgkfdhgjdfhgjkh')
const toggleSwitchChecked = ref(false)

/*======Fields:end=====*/

/*======PaginateList:start=====*/
const items = ref([
  { id: 1, name_en: 'coffee' },
  { id: 2, name_en: 'espresso' },
  { id: 3, name_en: 'cappuccino' },
  { id: 4, name_en: 'mocha' },
  { id: 5, name_en: 'tea' },
  { id: 6, name_en: 'sandwich' },
  { id: 7, name_en: 'hotdog' },
  { id: 8, name_en: 'omelette' },
  { id: 9, name_en: 'salad' },
  { id: 10, name_en: 'curry' }
])

const displayItems = ref<Item[]>([]);

const getDispItems = (dispArray: any) => {
  displayItems.value = dispArray
}
/*======PaginateList:end=====*/

/*======NavBar:start======*/
const navBarVisible = ref(false)
const showNavBar = () => {
  navBarVisible.value = true
}
const closeNavBar = () => {
  navBarVisible.value = false
}
/*======NavBar:end======*/

/*======Modal:start=====*/
const isModalVisible = ref(false)

const toggleModal = () => {
  isModalVisible.value = !isModalVisible.value
}

const closeModal = () => {
  isModalVisible.value = false
}

/*=======Modal:end======*/

/*======DataTable:start=====*/
const tableItems = ref([
  { date: '2024-01-01', title: 'Title 1', content: 'Content 1', author: 'Author 1' },
  { date: '2024-01-02', title: 'Title 2', content: 'Content 2', author: 'Author 2' },
  { date: '2024-01-03', title: 'Title 3', content: 'Content 3', author: 'Author 3' },
  { date: '2024-01-04', title: 'Title 4', content: 'Content 4', author: 'Author 4' },
  { date: '2024-01-05', title: 'Title 5', content: 'Content 5', author: 'Author 5' }
])

const targetData = ref([])

/*======EventCalendar:start=====*/
const events = [
  { name: "ミーティング", start: "2025-10-01", end:"2025-10-01", color:"blue"},
  { name: "イベント", start: "2025-10-02", end:"2025-10-03", color:"limegreen"},
  { name: "会議", start: "2025-10-06", end:"2025-10-06", color:"deepskyblue"},
  { name: "有給", start: "2025-10-08", end:"2025-10-08", color:"dimgray"},
  { name: "海外旅行", start: "2025-10-08", end:"2025-10-12", color:"navy"},
  { name: "誕生日", start: "2025-10-16", end:"2025-10-16", color:"orange"},
  { name: "イベント", start: "2025-10-12", end:"2025-10-15", color:"limegreen"},
  { name: "出張", start: "2025-10-12", end:"2025-10-13", color:"teal"},
  { name: "客先訪問", start: "2025-10-14", end:"2025-10-14", color:"red"},
  { name: "パーティ", start: "2025-10-15", end:"2025-10-15", color:"royalblue"},
  { name: "ミーティング", start: "2025-10-18", end:"2025-10-19", color:"blue"},
  { name: "イベント", start: "2025-10-21", end:"2025-10-21", color:"limegreen"},
  { name: "有給2", start: "2025-10-20", end:"2025-10-20", color:"dimgray"},
  { name: "イベント", start: "2025-10-25", end:"2025-10-28", color:"limegreen"},
  { name: "会議2", start: "2025-10-21", end:"2025-10-21", color:"deepskyblue"},
  { name: "旅行", start: "2025-10-23", end:"2025-10-24", color:"navy"},
  { name: "ミーティング", start: "2025-10-28", end:"2025-10-28", color:"blue"},
  { name: "会議3", start: "2025-10-12", end:"2025-10-12", color:"deepskyblue"},
  { name: "誕生日", start: "2025-10-30", end:"2025-10-30", color:"orange"},
]
const selectedEvent = ref(null);

</script>

<template>
  <LayoutWrapper width="1024">

    <!-- ===== Buttons ===== -->
    <section v-if="props.component === 'BasicButton'">
      <BasicButton
        id="basicButtonId"
        class="basic-button-class"
        name="basic_button_name"
        type="submit"
        :style="{ color: 'white', backgroundColor: 'blue' }"
        :styleReset="false"
        :isDisabled="false"
      >
        BasicButton
      </BasicButton>
    </section>

    <section v-if="props.component === 'LinkButton'">
      <LinkButton
        id="linkButtonId"
        class="link-button-class"
        name="link_button_name"
        :style="{ backgroundColor: 'tomato' }"
        fontColor="white"
        :styleReset="false"
        :isDisabled="true"
        onclick="alert('hello')"
      >
        LinkButton
      </LinkButton>
    </section>

    <section v-if="props.component === 'PushButton'">
      <PushButton
        id="pushButtonId"
        class="push-button-class"
        name="push_button_name"
        type="button"
        :style="{ color: 'white', backgroundColor: 'bisque' }"
        :styleReset="false"
        :isDisabled="false"
        onclick="alert('hello')"
      >
        PushButton
      </PushButton>
    </section>

    <!-- ===== Displays ===== -->
    <section v-if="props.component === 'CardFlame'">
      <CardFlame
        id="cardFlameId"
        class="card-flame-class"
        :style="'background-color: lightgray; width:250px'"
        title="title"
        subtitle="subtitle"
      >
        <p>Enter the content of the card here.</p>
      </CardFlame>
    </section>

    <section v-if="props.component === 'ChipText'">
      <ChipText
        id="chipTextId"
        class="chip-text-class"
        :style="'background-color: lightgray;'"
        :styleReset="false"
      >
        <span>vue.js</span>
      </ChipText>
    </section>
    <section v-if="props.component === 'CustomMessage'">
      <CustomMessage message="infoメッセージ" mode="info" :duration="3000" />
      <CustomMessage message="warningメッセージ" mode="warning" />
      <CustomMessage message="Errorメッセージ" mode="error" />
    </section>
    <section v-if="props.component === 'LoadingLoader'">
      <LoadingLoader>
        <div class="loading_text">LoadingLoader</div>
      </LoadingLoader>
    </section>

    <section v-if="props.component === 'ModalDialog'">
      <ModalDialog
        id="modal-dialog-id"
        class="modal-dialog-class"
        :style="{ border: '2px solid blue' }"
        :is-visible="isModalVisible"
        @close="closeModal"
      >
        <p>Display modal content here</p>
      </ModalDialog>
      <button @click="toggleModal">Open Modal</button>
    </section>

    <section v-if="props.component === 'PageTitle'">
      <PageTitle
        id="pageTitleId"
        class="page-title-class"
        :style="'color: blue;'"
      >
        page title
      </PageTitle>
    </section>

    <section v-if="props.component === 'TabPanel'">
      <TabPanel 
        :tabs="['Tab 1', 'Tab 2', 'Tab 3']" 
        :count="3" 
        :style="{ margin: '10px' }" 
        color="#fff" 
        backgroundColor="#00a968"
      >
        <template #content0>
          <div>Content for Tab 1</div>
        </template>
        <template #content1>
          <div>Content for Tab 2</div>
        </template>
        <template #content2>
          <div>Content for Tab 3</div>
        </template>
      </TabPanel>
    </section>

    <section v-if="props.component === 'ToolTip'">
      <ToolTip>
        <template v-slot:toolTipBtn>
          <div class="andmore"><button>TEST</button></div>
        </template>
        <template v-slot:toolTipContent>
          <div class="pa-2">TESTNAN</div>
        </template>
      </ToolTip>
    </section>

    <!-- ===== Fields ===== -->
    <section v-if="props.component === 'CheckBoxField'">
      <CheckBoxField
        id="checkBoxFieldId"
        class="check-box-field-class"
        :styleReset="false"
        name="check_box_field_name"
        label="check-box-field Label"
        type="checkbox"
        :isDisabled="false"
        :isReadonly="false"
        item="check-box-field-item"
        v-model="checkedItem"
        :isChecked="checkBoxChecked"
        v-model:checked="checkBoxChecked"
      />
      <div>{{ checkedItem }}</div>
      <div>{{ checkBoxChecked }}</div>
    </section>

    <section v-if="props.component === 'ColorField'">
      <ColorField
        id="colorFieldId"
        class="color-field-class"
        style="border: 1px solid black"
        :styleReset="false"
        name="color_field_name"
        v-model="selectedColor"
      />
      <div>{{ selectedColor }}</div>
    </section>

    <section v-if="props.component === 'DateField'">
      <DateField
        type="date"
        id="dateFieldId"
        class="date-field-class"
        style="border: 1px solid black"
        :styleReset="false"
        name="date_field_name"
        minlength="2024-07-01"
        maxlength="2024-07-26"
        :isDisabled="false"
        :isReadonly="false"
        v-model="dateValue"
      />
      <div>{{ dateValue }}</div>
    </section>
  
    <section v-if="props.component === 'FileDnd'">
      <h3>FileDnd</h3>
      <div style="margin-top: 15px; margin-bottom: 15px">
        <FileDnd
          v-model="selectedFiles"
          style="width: 400px; height: 150px;" 
          accept="image/*,.pdf,.docx"
          />
        <div v-if="selectedFiles.length > 0">
          Selected Files:
          <ul>
            <li v-for="(file, i) in selectedFiles" :key="i">
              {{ file.name }} ({{ (file.size / 1024).toFixed(1) }} KB)
            </li>
          </ul>
        </div>
      </div>
      <div><strong>Selected Files:</strong> {{ selectedFiles.length }}</div>
    </section>
        
    <section v-if="props.component === 'FileField'">
      <FileField 
        v-model="fileData"
      >ファイル選択</FileField>
      <div>
        <ul>
          <li v-for="file in fileData" :key="file.name">
            {{ file.name }} ({{ file.size }} bytes)
          </li>
        </ul>
      </div>
    </section>

    <section v-if="props.component === 'MoneyField'">
      <MoneyField
        id="moneyFieldId"
        class="money-field-class"
        style="background-color: blanchedalmond"
        name="money_field_name"
        :min="100"
        :max="100000"
        :isDisabled="false"
        :isReadonly="false"
        v-model="moneyValue"
      />
      <div>{{ moneyValue }}</div>
    </section>

    <section v-if="props.component === 'MultiLineField'">
      <MultiLineField
        id="multiLinesFieldId"
        class="multi-lines-field-class"
        style="width: 300px"
        name="multi_lines_field_name"
        :isDisabled="false"
        :isReadonly="false"
        placeholder="placeholderText"
        :maxlength="500"
        :rows="3"
        :cols="30"
        v-model="longText"
      />
      <div>
        {{ longText }}
      </div>
    </section>

    <section v-if="props.component === 'NumberField'">
      <NumberField
        id="numberFieldId"
        class="number-field-class"
        name="number_field_name"
        :min="0"
        :max="7000"
        :isDisabled="false"
        :isReadonly="false"
        v-model="numberValue"
      />
      <div>{{ numberValue }}</div>
    </section>

    <section v-if="props.component === 'RadioField'">
      <RadioField
        :items="rangeItems"
        id="radioFieldId"
        class="radio-field-class"
        style="accent-color: red"
        name="radio_field_name"
        accentColor="red"
        :isDisabled="false"
        :isReadonly="false"
        v-model="radioCheckedItem"
      />
      <div>{{ radioCheckedItem }}</div>
    </section>

    <section v-if="props.component === 'RangeField'">
      <RangeField
        id="rangeFieldId"
        class="range-field-class"
        style="width: 300px"
        name="range_field_name"
        :min="0"
        :max="100"
        :step="5"
        :isDisabled="false"
        :isReadonly="false"
        v-model="rangeValue"
      />
      <div>{{ rangeValue }}</div>
    </section>

    <section v-if="props.component === 'SelectField'">
      <SelectField
        id="example-select"
        class="example-select-field"
        style="width: 200px;"
        name="exampleSelect"
        v-model="selectedItem"
      />
      <div>{{ selectedItem }}</div>
    </section>

    <section v-if="props.component === 'TextField'">
      <div>      
        <TextField
          id="textFieldId"
          class="text-field-class"
          style="width: 100px"
          name="text_field_name"
          :minlength="5"
          :maxlength="10"
          :isDisabled="false"
          :isReadonly="false"
          :text="text"
          v-model="text"
          required
        />
        <div>{{ text }}</div>
      </div>
      <div>
        <TextField type="password" :text="text2" v-model="text2" />
        <div>{{ text2 }}</div>
      </div>
    </section>

    <section v-if="props.component === 'ToggleSwitch'">
      <ToggleSwitch
        size="L"
        backgroundColor="red"
        v-model="toggleSwitchChecked"
      />
      <div>Checked：{{ toggleSwitchChecked }}</div>
    </section>

    <!-- ===== Icons ===== -->
    <section v-if="props.component === 'ImgIcon'">
      <ImgIcon
        id="imgIconId"
        class="img-icon-class"
        style="border: 2px solid #000"
        path="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><path d='M10 10 H 90 V 90 H 10 Z' /></svg>"
        size="64"
        alt="Example Image"
      />
    </section>

    <section v-if="props.component === 'SvgIcon'">
      <SvgIcon
        id="svgIconId"
        class="svg-icon--class"
        style="color: red"
        :path="mdiAccount"
        size="64"
      />
    </section>

    <!-- ===== Layouts ===== -->
    <section v-if="props.component === 'GridRow'">
      <GridRow>
        <GridColumn :lg_cols="3" :cols="6" :sm_cols="12">
          <p>Left</p>
        </GridColumn>
        <GridColumn :lg_cols="3" :cols="6" :sm_cols="12">
          <p>Right</p>
        </GridColumn>
      </GridRow>
    </section>

    <section v-if="props.component === 'LayoutWrapper'">
      <LayoutWrapper style="border: 1px solid black">
        <h1>Re:Vue</h1>
        <section>
          LayoutWrapper Area
        </section>
      </LayoutWrapper>
    </section>

    <section v-if="props.component === 'LayoutHeader'">
      <LayoutHeader>
        <h1 class="ml-2">Re:Vue</h1>
      </LayoutHeader>
    </section>

    <section v-if="props.component === 'LayoutFooter'">
      <LayoutFooter><div>Revue</div></LayoutFooter>
    </section>

    <section v-if="props.component === 'NavBar'">
      <div class="three-lines mr-2" @click="showNavBar">&equiv;</div>
      <NavBar :isVisible="navBarVisible" @close="closeNavBar">
        <NavBarItem to="" :icon="mdiInformationOutline" linkName="TEST" />
      </NavBar>
    </section>

    <!-- ===== Lists ===== -->
    <section v-if="props.component === 'AccordionMenu'">
      <AccordionMenu
        id="accordionMenuId"
        class="accordion-menu--class"
        :style="{ backgroundColor: 'lightgray' }"
        :styleReset="false"
        :lists="[
          { title: 'リスト1', items: ['aaa', 'bbb', 'ccc'] },
          { title: 'リスト2', items: ['aaa', 'bbb', 'ccc'] }
        ]"
      />
    </section>

    <section v-if="props.component === 'BasicList'">
      <BasicList
        id="basicListId"
        class="basic-list-class"
        :style="{ color: 'black', backgroundColor: 'white' }"
        :styleReset="false"
        :items="[
          { id: '1', title: 'Custom Item #1', value: 1, href: '#' },
          { id: '2', title: 'Custom Item #2', value: 2 }
        ]"
        @update:value="(value:string) => console.log(value)"
      />
    </section>

    <section v-if="props.component === 'BreadcrumbList'">
      <BreadcrumbList
        :items="[
          { href: '/', name: 'home' },
          { href: '/about', name: 'about' },
          { name: 'current page' }
        ]"
        id="breadcrumbListId"
        class="breadcrumb-list-class"
        :style="{ color: 'tomato' }"
      />
    </section>

    <section v-if="props.component === 'PaginateList'">
      <ul>
        <li v-for="item in displayItems" :key="item.id">
          <span>{{ item.name_en }}</span>
        </li>
      </ul>
      <PaginateList
        id="paginateListId"
        :style="{ color: 'tomato' }"
        :items="items"
        steps="4"
        @handleAction="getDispItems"
      />
    </section>

    <section v-if="props.component === 'TreeList'">
      <TreeList
        id="tree-list"
        class="custom-tree-list"
        :style="{ color: 'black' }"
        :styleReset="false"
        :grandparents="[
          {
            id: '1',
            title: 'Grandparent #1',
            href: 'https://example.com/grandparent',
            parents: [
              {
                id: '1',
                title: 'Parent #1',
                href: 'https://example.com/parent',
                children: [
                  {
                    id: '1',
                    title: 'Child #1',
                    href: 'https://example.com/child',
                    items: [
                      { id: '1', title: 'Item #1', href: 'https://example.com/item1' },
                      { id: '2', title: 'Item #2', href: 'https://example.com/item2' }
                    ]
                  }
                ]
              }
            ]
          }
        ]"
      />
    </section>

    <!-- ===== Tables ===== -->
    <section v-if="props.component === 'DataTable'">
      <DataTable
        :search_mode="true"
        :pagination_mode="true"
        :headers="['Date', 'Title', 'Content', 'Author']"
        :items="tableItems"
        v-model="targetData"
        steps="5"
      />
      <div>{{ targetData }}</div>
    </section>

    <!-- ===== Calendars ===== -->
    <section v-if="props.component === 'EventCalendar'">
      <EventCalendar 
        v-model="selectedEvent" 
        :events="events" 
      />
      <div>{{ selectedEvent }}</div>
    </section>
  </LayoutWrapper>
</template>
<style>
section {
  margin: 20px;
  overflow-x: auto;
}


</style>
