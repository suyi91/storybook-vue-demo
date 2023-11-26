<script setup lang="tsx">
import Table from './Table'
import Form from './Form'
import { reactive } from 'vue';

const form = reactive({
  name: 'name',
  name2: 'name2ss',
})
</script>

<template>
  <Form :form="form" style="width: 100%;" />
  <Table style="width: 100%;" />
</template>

<style scoped>

</style>
