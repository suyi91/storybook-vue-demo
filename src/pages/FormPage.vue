<script setup lang="tsx">
import Form from '../Form'
import '../setupGlobalFormItem'
import { reactive, ref } from 'vue';

const form = reactive({
  name: 'name',
  name2: 'name2ss',
  name3: 'xxxxxx',
  name4: 2,
  name5: 1,
})

const formConfig = {
  labelWidth: '120px',
}

const name5Options = ref([
  { label: 'option: 1', value: 1 },
  { label: 'option: 2', value: 2 },
  { label: 'option: 3', value: 3 },
])

const formItemConfigs = [
  {
    prop: 'name',
    label: 'Activity name',
    component: {
      name: 'custom'
    },
  },
  {
    prop: 'name2',
    label: 'Activity name2',
    component: {
      name: 'input',
      compProps: {
        clearable: true,
      },
    },
  },
  {
    prop: 'name3',
    label: '自定义template',
    component: {
      name: 'custom',
      customSlot: 'name3',
    },
  },
  {
    prop: 'name4',
    label: '自定义render传入',
    component: {
      name: 'custom',
      // customSlot: () => {
      //   return <div style="color: red; font-style: italic; font-weight: bold;">自定义render传入</div>
      // },
    },
  },
  {
    prop: 'name5',
    label: 'select项目',
    component: {
      name: 'select',
      compProps: {
        clearable: true,
      },
      // options: name5Options.value,
    },
  },
  {
    prop: 'name6',
    label: 'datePicker项目',
    component: {
      name: 'datePicker',
      compProps: {
        clearable: true,
      },
    },
  },
  {
    prop: 'name7',
    label: '使用方自定义',
    component: {
      name: 'Test',
    },
    itemProps: {
      'validateStatus': 'validating'
    },
  }
]

const itemConfigsPreHandler = configList => {
  configList.find(config => config.prop === 'name4').component.customSlot = () => {
    return <div style="color: red; font-style: italic; font-weight: bold;">自定义render传入</div>
  }
  configList.find(config => config.prop === 'name5').component.options = name5Options.value
  return configList
}

const formCustomComps = {
  Test: {
    setup: () => () => <div>testsssss</div>
  },
}

const formRef = ref()
</script>

<template>
  <Form
    ref="formRef"
    :model="form"
    :formConfig="formConfig"
    :formCustomComps="formCustomComps"
    :itemConfigs="formItemConfigs"
    :itemConfigsPreHandler="itemConfigsPreHandler"
    style="width: 100%;"
  >
    <template #name3="val">
      <div>{{ val }}</div>
      这里是自定义的内容
    </template>
  </Form>
  <div>form: {{ form }}</div>
</template>

<style scoped>

</style>
