import { ElTable, ElTableColumn, ElPagination } from "element-plus"
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
    loading: Boolean,
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
    pagination: {
      type: [Boolean, Object],
    },
  },
  setup: (props) => {
    return () => [
      <ElTable
        vLoading={props.loading}
        data={props.tableData}
        {...props.tableConfig.config}
      >
        {props.tableConfig.columns.map(column => (
          <ElTableColumn
            key={column.prop}
            prop={column.prop}
            label={column.label}
            width={column.width}
            type={column.type}
            {...column.colProps}
          >{{
            default: scope => {
              if (column.type === 'selection') return null
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
      </ElTable>,
      props.pagination && (
        <div style="margin-top: 16px; display: flex;">
          <ElPagination
            style="margin-left: auto;"
            {...{
              ...props.pagination,
              'currentPage': props.pagination.currentPage,
              'onUpdate:currentPage': val => {
                props.pagination.currentPage = val
                props.pagination.onCurrentPageChange?.(val)
              },
              'pageSize': props.pagination.pageSize,
              'onUpdate:pageSize': val => {
                props.pagination.pageSize = val
                props.pagination.onPageSizeChange?.(val)
              },
            }}
          />
        </div>
      ),
    ]
  },
})

export default Table
