---
title: 【revuekitz】sample code
description:
category: vue
createdAt: 2024-07-27
updatedAt: 2024-07-27
sortNumber: 000
path: "/documents/revuekitz/000_intro"
---

<nuxt-content-wrapper>

```vue
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
import { LoadingLoader } from 'revuekitz'
import { ModalDialog } from 'revuekitz'
import { PageTitle } from 'revuekitz'
import { TabPanel } from 'revuekitz'
import { ToolTip } from 'revuekitz'

// fields(12)
import { CheckBoxField } from 'revuekitz'
import { ColorField } from 'revuekitz'
import { DateField } from 'revuekitz'
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



/*======Fields:start=====*/
const text = ref('text')
const text2 = ref('text2')
const numberValue = ref(100)
const moneyValue = ref(50)
const checkedItem = ref('')
const radioCheckedItem = ref('Option 1')
const selectedItem = ref('A')
const rangeValue = ref('')
const rangeItems = ref(['Option 1', 'Option 2', 'Option 3'])

const fileData = ref(null)
const selectedColor = ref('')
const dateValue = ref('')
const toggleSwitchChecked = ref(false)

const getFileData = (targetFile: { name: null }) => {
  console.log(targetFile)
  fileData.value = targetFile.name
}
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

const displayItems = ref([])

const getDispItems = (dispArray: never[]) => {
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
</script>

<template>
  <LayoutWrapper width="1024">
    <PageTitle>RevueKitz</PageTitle>
    <TabPanel
      style="height: 100vh"
      :tabs="['buttons', 'displays', 'fields', 'icons', 'layouts', 'lists', 'tables']"
    >
      <template v-slot:content0>
        <section>
          <h2 class="mb-3">buttons</h2>
          <div>
            <div style="margin-top: 15px; margin-bottom: 15px">
              <h3 class="mr-2">BasicButton</h3>
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
            </div>
          </div>
          <div>
            <div style="margin-top: 15px; margin-bottom: 15px">
              <h3 class="mr-2">LinkButton</h3>
              <LinkButton
                id="linkButtonId"
                class="link-button-class"
                name="link_button_name"
                :style="{ backgroundColor: 'tomato' }"
                fontColor="white"
                :styleReset="false"
                :isDisabled="true"
                onclick="alert('hello')"
                >LinkButton</LinkButton
              >
            </div>
          </div>
          <div style="margin-top: 15px; margin-bottom: 15px">
            <h3 class="mr-2">PushButton</h3>
            <PushButton
              id="pushButtonId"
              class="push-button-class"
              name="push_button_name"
              type="button"
              :style="{ color: 'white', backgroundColor: 'bisque' }"
              :styleReset="false"
              :isDisabled="false"
              onclick="alert('hello')"
              >PushButton</PushButton
            >
          </div>
        </section>
      </template>
      <template v-slot:content1>
        <section>
          <h3>Card</h3>
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
        <section>
          <h3>ChipText</h3>
          <div style="margin-top: 15px; margin-bottom: 15px">
            <ChipText
              id="chipTextId"
              class="chip-text-class"
              :style="'background-color: lightgray;'"
              :styleReset="false"
            >
              <span>vue.js</span>
            </ChipText>
          </div>
        </section>
        <section>
          <h2>LoadingLoader</h2>
          <div>
            <small>It shows up during theloading state when mounting.</small>
            <LoadingLoader>
              <div class="loading_text">LoadingLoader</div>
            </LoadingLoader>
          </div>
        </section>
        <section>
          <h3>Modal</h3>
          <div style="margin-top: 15px; margin-bottom: 15px">
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
          </div>
        </section>
        <section>
          <h2>page title</h2>
          <div>
            <PageTitle id="pegeTitleId" class="page-title-class" :style="'color: blue;'">
              page title
            </PageTitle>
          </div>
        </section>
        <section>
          <h2>TabPanel</h2>
          <small>This page uses a tab list.</small>
        </section>
        <section>
          <h2>ToolTip</h2>
          <div style="margin-top: 15px; margin-bottom: 15px">
            <ToolTip>
              <template v-slot:toolTipBtn>
                <div class="andmore"><button>TEST</button></div>
              </template>
              <template v-slot:toolTipContent>
                <div class="pa-2">TESTNAN</div>
              </template>
            </ToolTip>
          </div>
        </section>
      </template>
      <template v-slot:content2>
        <div style="text-align: center">
          <small>You can also use required and hidden attributes</small>
        </div>
        <section>
          <h3>CheckBoxField</h3>
          <div>
            <CheckBoxField
              id="checkBoxFieldId"
              class="check-box-field-class"
              style="color: red"
              :styleReset="false"
              name="check_box_field_name"
              item="check-box-field-item"
              label="check-box-field Label"
              type="checkbox"
              :isChecked="true"
              :isDisabled="false"
              :isReadonly="false"
              v-model:checked="checkedItem"
            />
          </div>
          <div>{{ checkedItem }}</div>
        </section>
        <section>
          <h3>ColorField</h3>
          <div style="margin-top: 15px; margin-bottom: 15px">
            <ColorField
              id="colorFieldId"
              class="color-field-class"
              style="border: 1px solid black"
              :styleReset="false"
              name="color_field_name"
              v-model:selected-color="selectedColor"
            />
          </div>
          <div>{{ selectedColor }}</div>
        </section>
        <section>
          <h3>DateField</h3>
          <div style="margin-top: 15px; margin-bottom: 15px">
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
              @fileData="dateValue"
            />
          </div>
          <div>{{ dateValue }}</div>
        </section>
        <section>
          <h3>FileField</h3>
          <div style="margin-top: 15px; margin-bottom: 15px">
            <FileField @fileData="getFileData" />
          </div>
          <div>{{ fileData }}</div>
        </section>
        <section>
          <h3>MoneyField</h3>
          <div>
            <MoneyField
              id="moneyFieldId"
              class="money-field-class"
              style="background-color: blanchedalmond"
              name="money_field_name"
              :min="100"
              :max="100000"
              :isDisabled="false"
              :isReadonly="false"
              v-model:money="moneyValue"
            />
          </div>
          <div>{{ moneyValue }}</div>
        </section>
        <section>
          <h3>MultiLineField</h3>
          <div style="margin-top: 15px; margin-bottom: 15px">
            <MultiLineField
              id="multiLinesFieldId"
              class="multi-lines-field-class"
              style="width: 300px"
              name="multi_lines_field_name"
              valueName="textValue"
              :isDisabled="false"
              :isReadonly="false"
              placeholder="placeholderText"
              :maxlength="500"
              :rows="3"
              :cols="30"
            />
          </div>
        </section>
        <section>
          <h3>NumberField</h3>
          <div>
            <NumberField
              id="numberFieldId"
              class="number-field-class"
              :style="{ backgroundColor: '#f0f0f0', border: '1px solid #ccc' }"
              name="number_field_name"
              :min="0"
              :max="100"
              :isDisabled="false"
              :isReadonly="false"
              v-model:number="numberValue"
            />
          </div>
          <div>{{ numberValue }}</div>
        </section>
        <section>
          <h3>RadioField</h3>
          <div>
            <RadioField
              :items="rangeItems"
              id="radioFieldId"
              class="radio-field-class"
              style="accent-color: red"
              name="radio_field_name"
              accentColor="red"
              :isDisabled="false"
              :isReadonly="false"
              v-model:radio="radioCheckedItem"
            />
          </div>
          <div>{{ radioCheckedItem }}</div>
        </section>
        <section>
          <h3>RangeField</h3>
          <div>
            <RangeField
              id="rangeFieldId"
              class="range-field-class"
              style="width: 300px"
              name="range_field_name"
              :initValue="50"
              :min="0"
              :max="100"
              :step="5"
              :isDisabled="false"
              :isReadonly="false"
              v-model:range-value="rangeValue"
            />
          </div>
          <div>{{ rangeValue }}</div>
        </section>
        <section>
          <h3>SelectField</h3>
          <div>
            <SelectField v-model:selected-item="selectedItem" />
          </div>
          <div>{{ selectedItem }}</div>
        </section>
        <section>
          <h3>TextField</h3>
          <div>
            <TextField
              id="textFieldId"
              class="text-field-class"
              style="width: 300px"
              name="text_field_name"
              :minlength="5"
              :maxlength="10"
              :isDisabled="false"
              :isReadonly="false"
              v-model:binding-value="text"
              required
            />
          </div>
          <div><TextField type="password" v-model:binding-value="text2" /></div>
          <div>{{ text }}</div>
          <div>{{ text2 }}</div>
        </section>

        <section>
          <h3>ToggleSwitch</h3>
          <small>There are S, M, and L sizes available.</small>
          <div style="margin-top: 15px; margin-bottom: 15px">
            <ToggleSwitch
              size="L"
              backgroundColor="red"
              v-model:binding-value="toggleSwitchChecked"
            />
            <div>Checked：{{ toggleSwitchChecked }}</div>
          </div>
        </section>
      </template>
      <template v-slot:content3>
        <section>
          <h2>Img Icon</h2>
          <small
            >"The icon size can be either '128', '64', '32', or '18'. The default is '64'."</small
          >
          <div style="display: flex; height: 100px; margin-top: 15px; margin-bottom: 20px">
            <ImgIcon
              id="imgIconId"
              class="img-icon-class"
              style="border: 2px solid #000"
              imgFile="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><path d='M10 10 H 90 V 90 H 10 Z' /></svg>"
              size="64"
              alt="Example Image"
            />
          </div>
        </section>
        <section>
          <h2>Svg Icon</h2>
          <small
            >"The icon size can be either '128', '64', '32', or '18'. The default is '64'."</small
          >
          <div>
            <SvgIcon
              id="svgIconId"
              class="svg-icon--class"
              style="color: red"
              :path="mdiAccount"
              size="64"
            />
          </div>
        </section>
      </template>
      <template v-slot:content4>
        <section>
          <h3>GridRow/GridColumn(Grid System)</h3>
          <GridRow>
            <GridColumn :lg_cols="3" :cols="6" :sm_cols="12">
              <p>Left</p>
            </GridColumn>
            <GridColumn :lg_cols="3" :cols="6" :sm_cols="12">
              <p>Right</p>
            </GridColumn>
          </GridRow>
        </section>
        <section>
          <h3>LayoutWrapper</h3>
          <LayoutWrapper style="border: 1px solid black"> LayoutWrapper Area </LayoutWrapper>
        </section>

        <section>
          <h2>LayoutHeader</h2>
          <LayoutHeader>
            <h1 class="ml-2">Re:Vue</h1>
            <div></div>
          </LayoutHeader>
        </section>
        <section>
          <h2>LayoutFooter</h2>
          <div style="margin-top: 15px; margin-bottom: 15px">
            <LayoutFooter><div>Revue</div></LayoutFooter>
          </div>
        </section>
        <section>
          <h2>NavBar</h2>
          <div>
            <div class="three-lines mr-2" @click="showNavBar">&equiv;</div>
          </div>
          <div>
            <NavBar :isVisible="navBarVisible" @close="closeNavBar">
              <NavBarItem to="" :icon="mdiInformationOutline" linkName="TEST" />
            </NavBar>
          </div>
        </section>
      </template>
      <template v-slot:content5>
        <section>
          <h2>AccordionMenu</h2>
          <div>
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
          </div>
        </section>
        <section>
          <h2>Basic Lists</h2>
          <div>
            <BasicList
              id="basicListId"
              class="basic-list-class"
              :style="{ color: 'black' }"
              :styleReset="false"
              :items="[
                { id: '1', title: 'Custom Item #1', value: 1, href: '#' },
                { id: '2', title: 'Custom Item #2', value: 2 }
              ]"
              @update:value="(value: any) => console.log(value)"
            />
          </div>
        </section>
        <section>
          <h2>BreadcrumbList</h2>
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
        <section>
          <h2>PaginateList</h2>
          <div>
            <ul>
              <li v-for="item in displayItems" :key="item.id">
                <span>{{ item.name_en }}</span>
              </li>
            </ul>
          </div>
          <div>
            <PaginateList
              id="paginateListId"
              :style="{ color: 'tomato' }"
              :items="items"
              steps="4"
              @handleAction="getDispItems"
            />
          </div>
        </section>
        <section>
          <h2>TreeList</h2>
          <div style="margin-top: 15px; margin-bottom: 15px">
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
                            {
                              id: '1',
                              title: 'Item #1',
                              href: 'https://example.com/item1'
                            },
                            {
                              id: '2',
                              title: 'Item #2',
                              href: 'https://example.com/item2'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]"
            />
          </div>
        </section>
      </template>
      <template v-slot:content6>
        <section>
          <h3>DataTable</h3>
          <div style="margin-top: 15px; margin-bottom: 15px">
            <DataTable
              :search_mode="true"
              :pagination_mode="true"
              :headers="['Date', 'Title', 'Content', 'Author']"
              :items="tableItems"
              steps="5"
            />
          </div>
        </section>
      </template>
    </TabPanel>
  </LayoutWrapper>
</template>
<style>
section {
  margin: 20px;
}
</style>

```


</nuxt-content-wrapper>