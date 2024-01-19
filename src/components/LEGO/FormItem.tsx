import { _formKey } from '@/Form';
import { ElDatePicker, ElFormItem, ElInput, ElOption, ElSelect } from 'element-plus'
import { inject, toRef, unref } from 'vue'

export const CustomFormItem = (props, { slots }) => {
  const form = inject(_formKey, {});
  const value = toRef(form.value, props.config.prop)
  return (
    <ElFormItem {...props.config}>{slots.default?.(value.value)}</ElFormItem>
  )
}

export const InputFormItem = (props) => {
  const form = inject(_formKey, {});
  const value = toRef(form.value, props.config.prop)
  return (
    <CustomFormItem
      {...{
        config: props.config,
      }}
    >{{
      default: () => (
        <ElInput
          {...props.extra.compProps}
          v-model={value.value}
        />
      )
    }}</CustomFormItem>
  )
}

export const SelectFormItem = (props) => {
  const form = inject(_formKey, {});
  const value = toRef(form.value, props.config.prop)
  return (
    <CustomFormItem
      {...{
        config: props.config,
      }}
    >{{default: () => (
      <ElSelect
        v-model={value.value}
        {...props.extra.compProps}
      >{
        unref(props.extra.options).map(option => <ElOption key={option.value} value={option.value} label={option.label} />)
      }</ElSelect>
    )}}</CustomFormItem>
  )
}

export const DatePickerFormItem = props => {
  const form = inject(_formKey, {});
  const value = toRef(form.value, props.config.prop)
  return (
    <CustomFormItem
      {...{
        config: props.config,
      }}
    >{{default: () => (
      <ElDatePicker
        v-model={value.value}
        {...props.extra.compProps}
      />
    )}}</CustomFormItem>
  )
}
