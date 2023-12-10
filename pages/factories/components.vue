<script setup>
import TextArea from "../../components/global/textfield/TextArea"
import FormInput from "@/components/global/forms/FormInput.vue"
import FormRadio from "@/components/global/forms/FormRadio.vue"
import FormCheckBox from "@/components/global/forms/FormCheckBox.vue"
import FormSelect from "@/components/global/forms/FormSelect.vue"

const txt =ref("");

</script>
<template>

    <TextArea
      v-model:value-txt="txt" 
    ></TextArea>
   {{ txt }}


</template>