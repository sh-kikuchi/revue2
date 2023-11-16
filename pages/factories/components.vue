<script setup>
import TextArea from "../../components/public/atoms/textfield/TextArea"
import FormInput from "~~/components/public/atoms/inputs/FormInput.vue"
import FormRadio from "~~/components/public/atoms/inputs/FormRadio.vue"
import FormCheckBox from "~~/components/public/atoms/inputs/FormCheckBox.vue"
import FormSelect from "~~/components/public/atoms/inputs/FormSelect.vue"

const txt =ref("");

</script>
<template>

    <TextArea
      v-model:value-txt="txt" 
    ></TextArea>
   {{ txt }}


</template>