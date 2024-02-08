import { ElTable, ElTableColumn } from "element-plus"
import { defineComponent } from "vue"
import { BasicTableCell, CustomTableCell, HtmlTableCell } from "./components/LEGO/TableCell"

const getCellComponent = (componentName: string, extra = {}, val) => {
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
      props = { ...extra, content: val }
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
  name: 'Table',
  props: {
    tableConfig: {
      type: Object,
      default: () => ({
        config: {},
        columns: [],
      }),
    },
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  setup: (props) => {
    return () => (
      <ElTable
        data={props.tableData}
        {...props.tableConfig.config}
      >
        {props.tableConfig.columns.map(column => (
          <ElTableColumn
            key={column.prop}
            prop={column.prop}
            label={column.label}
            width={column.width}
          >{{
            default: scope => {
              const { Component, props } = getCellComponent(
                column.component.name,
                column.component.extra,
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
