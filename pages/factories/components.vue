<script setup>
import TextArea from "../../components/public/atoms/textfield/TextArea"
import FormInput from "@/components/public/atoms/forms/FormInput.vue"
import FormRadio from "@/components/public/atoms/forms/FormRadio.vue"
import FormCheckBox from "@/components/public/atoms/forms/FormCheckBox.vue"
import FormSelect from "@/components/public/atoms/forms/FormSelect.vue"

const txt =ref("");

</script>
<template>

    <TextArea
      v-model:value-txt="txt" 
    ></TextArea>
   {{ txt }}


</template>