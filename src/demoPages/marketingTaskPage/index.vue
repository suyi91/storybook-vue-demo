<script setup lang="tsx">
import { reactive, ref } from 'vue'
import Form from '../../Form'
import formJson from './form.json'
import { queryCityList } from '../../demoApi/cityList'
import tableJson from './table.json'
import Table from '../../Table'
import { ElButton, ElIcon } from 'element-plus'

const mockData = Array.from({ length: 88 }, (_, i) => ({
  id: i,
  line1: `line1-${i}`,
  line2: `line2-${i}`,
  line3: `line3-${i}`,
}))

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
  onCurrentPageChange: (currentPage) => {
    search({ currentPage, pageSize: pagination.pageSize })
  },
  onPageSizeChange: (pageSize) => {
    pagination.currentPage = 1
    search({ currentPage: pagination.currentPage, pageSize })
  },
})

const tableData = ref([])
const tableLoading = ref(false)

const cityList = ref()

const itemConfigsPreHandler = configList => {
  configList.find(config => config.prop === 'cityCode').component.options = cityList
  return configList
}

const search = ({ pageSize, currentPage }) => {
  console.log('in search', pageSize, currentPage)
  tableLoading.value = true
  setTimeout(() => {
    pagination.total = mockData.length
    tableData.value = mockData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    if (tableData.value.length === 0) {
      pagination.currentPage = 1
      tableData.value = mockData.slice(0, pageSize)
    } else {
      pagination.currentPage = currentPage
    }
    tableLoading.value = false;
  }, Math.random() * 1000);
}

const clickSearch = () => {
  pagination.currentPage = 1
  search({
    pageSize: pagination.pageSize,
    currentPage: pagination.currentPage,
  })
}

const clickReset = () => {
  // TODO: form reset
  clickSearch()
}

queryCityList().then(list => {
  cityList.value = list
})

search({
  pageSize: pagination.pageSize,
  currentPage: pagination.currentPage,
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
        <ElButton type="primary" @click="clickSearch" :loading="tableLoading">
          <ElIcon style="vertical-align: middle; margin-right: 8px">
            <Search />
          </ElIcon>
          搜索
        </ElButton>
        <ElButton @click="clickReset">
          <ElIcon style="vertical-align: middle; margin-right: 8px">
            <Refresh />
          </ElIcon>
          重置
        </ElButton>
      </template>
    </Form>
    <Table
      :loading="tableLoading"
      :tableData="tableData"
      :tableConfig="tableJson"
      :pagination="pagination"
    />
  </div>
</template>
<style scoped>

</style>
