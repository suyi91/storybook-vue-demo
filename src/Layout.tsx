import { defineComponent } from "vue"

const Layout = defineComponent({
  props: {
    config: {
      type: Object,
      default: () => ({
        children: [],
      }),
    }
  },
  setup: (props, { slots }) => {
    return () => (
      <div>
        <h1>Layout</h1>
      </div>
    )
  }
})

export default Layout
