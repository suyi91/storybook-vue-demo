import { _formKey } from '@/Form';
import { ElFormItem } from 'element-plus'
import { inject, toRef } from 'vue'

export const CustomFormItem = (props, { slots }) => {
  const form = inject(_formKey, {});
  const value = toRef(form.value, props.config.prop)
  return (
    <ElFormItem {...props.config}>{slots.default?.(value)}</ElFormItem>
  )
}

export const InputFormItem = (props) => {
  return (
    <CustomFormItem 
      {...{
        config: props.config,
      }}
    >{{default: val => (<ElInput v-model={val.value} />)}}</CustomFormItem>
  )
}