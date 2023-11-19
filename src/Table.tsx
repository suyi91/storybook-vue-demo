import { ElTable, ElTableColumn } from "element-plus"
import { defineComponent, ref } from "vue"
import { BasicTableCell, CustomTableCell, HtmlTableCell } from "./components/LEGO/TableCell"

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
        ext: {
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

const getCellComponent = (componentName: string, ext = {}, val) => {
  let Component = 'span'
  let props = {}
  switch (componentName) {
    case 'BasicTableCell':
      Component = BasicTableCell
      props = { content: val }
      break
    case 'CustomTableCell':
      Component = CustomTableCell
      props = { vnodes: val }
      break
    case 'HtmlTableCell':
      Component = HtmlTableCell
      props = { ...ext, content: val }
      break
    default:
      break
  }

  return {
    Component,
    props,
  }
}

const Table = defineComponent({
  setup: (props, ctx) => {
    return () => (
      <ElTable
        data={tableData.value}
        {...tableConfig.config}
      >
        {tableConfig.columns.map(column => (
          <ElTableColumn 
            key={column.prop}
            prop={column.prop}
            label={column.label}
            width={column.width}
          >{{
            default: scope => {
              const { Component, props } = getCellComponent(
                column.component.name, 
                column.component.ext, 
                scope.row[column.prop]
              )
              return (
                <Component 
                  {...props}
                />
              )
            }
          }}
          </ElTableColumn>
        ))}
      </ElTable>
    )
  },
})

export default Table