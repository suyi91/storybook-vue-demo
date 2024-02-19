<script setup lang="tsx">
import { reactive, ref, watchEffect } from 'vue'
import Form from '../../Form'
import formJson from './form.json'
import { queryCityList } from '../../demoApi/cityList'
import tableJson from './table.json'
import Table from '../../Table'
import { ElButton, ElIcon } from 'element-plus'

const form = reactive({
  taskCode: '',
  taskName: '',
  taskStatus: '',
  timeRange: [],
  cityCode: '',
})

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  small: false,
  pageSizes: [10, 20, 30, 50],
  background: true,
  layout: "total, sizes, prev, pager, next, jumper",
})

const cityList = ref()

const itemConfigsPreHandler = configList => {
  configList.find(config => config.prop === 'cityCode').component.options = cityList
  return configList
}

const search = ({ pageSize, currentPage }) => {
  // TODO:
  console.log('in search: ', pageSize, currentPage)

  return null
}

const clickSearch = () => {
  search({
    pageSize: pagination.pageSize,
    currentPage: pagination.currentPage,
  })
}

queryCityList().then(list => {
  cityList.value = list
})


watchEffect(() => {
  search({
    pageSize: pagination.pageSize,
    currentPage: pagination.currentPage,
  })
})

</script>
<template>
  <div>
    <Form
      :model="form"
      :formConfig="formJson.formConfig"
      :itemConfigs="formJson.formItemConfigs"
      :itemConfigsPreHandler="itemConfigsPreHandler"
    >
      <template #ops>
        <ElButton type="primary" @click="clickSearch">
          <ElIcon style="vertical-align: middle; margin-right: 8px">
            <Search />
          </ElIcon>
          搜索
        </ElButton>
      </template>
    </Form>
    <Table
      :tableConfig="tableJson"
      :pagination="pagination"
    />
  </div>
</template>
<style scoped>

</style>
