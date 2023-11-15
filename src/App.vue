<script setup lang="tsx">
import { ref } from "vue";
import { BasicTableCell, CustomTableCell } from "./components/LEGO/TableCell.tsx";

const tableData = ref([
  {
    line1: "Hello World1",
    line2: <span style="color: red">Hello World1</span>,
  },
  {
    line1: "Hello World2",
    line2: <span style="color: blue">Hello World2</span>,
  },
  {
    line1: "Hello World3",
    line2: <span style="color: green">Hello World3</span>,
  },
])
</script>

<template>
  <div>
    <ElTable :data="tableData" style="width: 100%">
      <ElTableColumn label="line1" width="180">
        <template #default="scope">
          <BasicTableCell 
            :content="scope.row.line1"
          />
        </template>
      </ElTableColumn>
      <ElTableColumn label="line2">
        <template #default="scope">
          <CustomTableCell 
            :vnodes="scope.row.line2"
          />
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>

<style scoped>

</style>
