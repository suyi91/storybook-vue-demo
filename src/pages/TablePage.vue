<script setup lang="tsx">
import { ref } from 'vue';
import Table from '../Table'

const tableConfig = {
  config: {
    fit: true,
  },
  columns: [
    {
      label: "line1",
      prop: "line1",
      width: 180,
      component: {
        name: "BasicTableCell",
      },
    },
    {
      label: "line2",
      prop: "line2",
      component: {
        name: 'CustomTableCell',
        // TODO:
      },
    },
    {
      label: "line3",
      prop: "line3",
      component: {
        name: 'HtmlTableCell',
        extra: {
          tag: 'i',
        }
      },

    }
  ],
}

const tableData = ref([
  {
    line1: "Hello World1",
    line2: <span style="color: red">Hello World1</span>,
    line3: `<span style="color: red">New Hello World1</span>`,
  },
  {
    line1: "Hello World2",
    line2: <span style="color: blue">Hello World2</span>,
    line3: `<span style="color: blue">New Hello World2</span>`,
  },
  {
    line1: "Hello World3",
    line2: <span style="color: green">Hello World3</span>,
    line3: `<span style="color: green">New Hello World3</span>`,
  },
])
</script>

<template>
  <Table
    :tableConfig="tableConfig"
    :tableData="tableData"
    style="width: 100%;"
  />
</template>

<style scoped>

</style>
