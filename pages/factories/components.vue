<script setup>
import TextArea from "../../components/global/textfield/TextArea"
import FormInput from "@/components/global/inputs/FormInput.vue"
import FormRadio from "@/components/global/inputs/FormRadio.vue"
import FormCheckBox from "@/components/global/inputs/FormCheckBox.vue"
import FormSelect from "@/components/global/inputs/FormSelect.vue"
import BasicButton from "@/components/global/buttons/BasicButton"
import LinkButton from "@/components/global/buttons/LinkButton"
import PaginationTemplate from "@/components/global/paginations/PaginationTemplate"
import Tooltip from "@/components/global/displays/Tooltip"
import Accordion from "@/components/global/lists/Accordion"
const txt =ref("");

const test =ref([]);

</script>
<template>

    <TextArea
      v-model:value-txt="txt" 
    ></TextArea>
   {{ txt }}

   <div>
    <LinkButton
      href   = "https://ja.legacy.reactjs.org/docs/components-and-props.html"
      effect = "btnPush"
      color  = "btnBlueGreen"
    >ねこ</LinkButton>
   </div>
   <div>
    <BasicButton
      type   = "button"
      effect = "btnPush"
      color  = "btnBlueGreen"
    >いぬ</BasicButton>
   </div>
<!--   
<PaginationTemplate></PaginationTemplate> -->
<FormCheckBox
  id="checkboxId"
  class="checkbox-class"
  name="checkbox_name"
  valueName = "tomato"
/>
<Tooltip></Tooltip>
<Accordion></Accordion>

</template>