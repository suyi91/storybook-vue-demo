import { defineComponent } from "vue"
import { ElRow, ElCol } from 'element-plus'

const LayoutItem = defineComponent({
  name: 'LayoutItem',
  props: {
    customClass: [Array, String],
    customStyle: [Object, String],
    layout: Object,
  },
  setup: (props, { slots }) => {
    return () => (
      props.layout ? (
        <ElCol
          class={props.customClass}
          style={props.customStyle}
          {...props.layout}
        >{slots.default?.()}</ElCol>
      ) : (
        <div class={props.customClass} style={props.customStyle}>{slots.default?.()}</div>
      )
    )
  }
})

const Layout = defineComponent({
  name: 'Layout',
  props: {
    config: {
      type: Object,
      default: () => ({
        children: [],
      }),
    }
  },
  setup: (props) => {
    return () => (
      <ElRow>{props.config.children.map((item: any) => (
        <LayoutItem
          layout={item.layout}
          customClass={item.customClass}
          customStyle={item.customStyle}
        >{item.content}</LayoutItem>
      ))}</ElRow>
    )
  }
})

export default Layout
