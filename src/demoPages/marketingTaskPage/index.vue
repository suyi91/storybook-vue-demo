<script setup lang="tsx">
import { reactive, ref } from 'vue'
import Form from '../../Form'
import formJson from './form.json'
import { queryCityList } from '../../demoApi/cityList'
import tableJson from './table.json'
import Table from '../../Table'

const form = reactive({
  taskCode: '',
  taskName: '',
  taskStatus: '',
  timeRange: [],
  cityCode: '',
})

const cityList = ref()

const itemConfigsPreHandler = configList => {
  configList.find(config => config.prop === 'cityCode').component.options = cityList
  return configList
}

queryCityList().then(list => {
  cityList.value = list
})


</script>
<template>
  <div>
    <Form
      :model="form"
      :formConfig="formJson.formConfig"
      :itemConfigs="formJson.formItemConfigs"
      :itemConfigsPreHandler="itemConfigsPreHandler"
    />
    <Table
      :tableConfig="tableJson"
    />
  </div>
</template>
<style scoped>

</style>
