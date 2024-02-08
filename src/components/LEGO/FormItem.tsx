import { _formKey } from '@/Form';
import { ElFormItem } from 'element-plus'
import { defineComponent, inject, toRef } from 'vue'

export const CustomFormItem = defineComponent({
  name: 'CustomFormItem',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    }
  },
  setup: (props, { slots }) => {
    const form = inject(_formKey, {});
    const value = toRef(form.value, props.config.prop)
    return () => (
      <ElFormItem {...props.config}>{slots.default?.(value.value)}</ElFormItem>
    )
  }
})
