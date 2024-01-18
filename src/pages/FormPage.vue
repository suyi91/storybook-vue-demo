<script setup lang="tsx">
import Form from '../Form'
import { reactive } from 'vue';

const form = reactive({
  name: 'name',
  name2: 'name2ss',
  name3: 'xxxxxx',
  name4: 2,
})

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
      name: 'input'
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
      customSlot: () => {
        return <div>自定义render传入</div>
      },
    },
  },
]

</script>

<template>
  <Form :form="form" :itemConfigs="formItemConfigs" style="width: 100%;">
    <template #name3="val">
      <div>{{ val }}</div>
      这里是自定义的内容
    </template>
  </Form>
  <div>form: {{ form }}</div>
</template>

<style scoped>

</style>
