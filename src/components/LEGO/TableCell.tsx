import { defineComponent, h } from 'vue'

export const CustomTableCell = defineComponent({
  name: 'CustomTableCell',
  props: {
    vnodes: {},
  },
  setup: (props) => () => props.vnodes
})

export const BasicTableCell = defineComponent({
  name: 'BasicTableCell',
  props: {
    content: {},
  },
  setup: (props) => () => (
    <CustomTableCell vnodes={props.content} />
  )
})

export const HtmlTableCell = defineComponent({
  name: 'HtmlTableCell',
  props: {
    tag: {
      type: String,
      default: 'span',
    },
    content: {},
  },
  setup: (props) => () => (
    <CustomTableCell
      vnodes={h(props.tag, { innerHTML: props.content })}
    />
  )
})
