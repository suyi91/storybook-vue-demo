import { useVModel } from "@vueuse/core"
import { ElInput, ElSelect, ElOption, ElDatePicker } from "element-plus"
import { defineComponent, unref } from "vue"
import { registerGlobalCustomItem } from "./Form"

const _Input = defineComponent({
  props: {
    compProps: {
      type: Object,
    },
    modelValue: {},
  },
  emits: ['update:modelValue'],
  setup: (props, { emit }) => {
    const data = useVModel(props, 'modelValue', emit)

    return () => (
      <ElInput {...props.compProps} v-model={data.value} />
    )
  },
})

const _Select = defineComponent({
  props: {
    compProps: {
      type: Object,
    },
    extra: {
      type: Object,
    },
    modelValue: {},
  },
  emits: ['update:modelValue'],
  setup: (props, { emit }) => {
    const data = useVModel(props, 'modelValue', emit)

    return () => (
      <ElSelect
        v-model={data.value}
        {...props.compProps}
      >{
        (unref(props.extra?.options) || []).map(option => <ElOption key={option.value} value={option.value} label={option.label} />)
      }</ElSelect>
    )
  },
})

const _DatePicker = defineComponent({
  props: {
    compProps: {
      type: Object,
    },
    modelValue: {},
  },
  emits: ['update:modelValue'],
  setup: (props, { emit }) => {
    const data = useVModel(props, 'modelValue', emit)

    return () => (
      <ElDatePicker
        v-model={data.value}
        {...props.compProps}
      />
    )
  },
})

registerGlobalCustomItem('input', _Input)
registerGlobalCustomItem('select', _Select)
registerGlobalCustomItem('datePicker', _DatePicker)
