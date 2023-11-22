import { defineComponent } from "vue";
import { ElForm, ElFormItem } from 'element-plus'

const Form = defineComponent({
  setup: (props, ctx) => {
    return () => (
      <ElForm>Form TODO:</ElForm>
    )
  }
})

export default Form