import { defineComponent, provide, toRef } from "vue";
import { ElForm } from 'element-plus'
import { CustomFormItem, DatePickerFormItem, InputFormItem, SelectFormItem } from './components/LEGO/FormItem'

const isString = val => typeof val === 'string';

const getComponent = compName => {
  switch(compName) {
    case 'input':
      return InputFormItem;
    case 'select':
      return SelectFormItem;
    case 'datePicker':
      return DatePickerFormItem;
    case 'custom':
    default:
      return CustomFormItem;
  }
}
export const _formKey = '__syForm';
const Form = defineComponent({
  props: {
    form: {
      type: Object,
      default: () => ({})
    },
    formConfigs: {
      type: Object,
      default: () => ({}),
    },
    itemConfigs: {
      type: Array,
      default: () => [],
    },
    itemConfigsPreHandler: {
      type: Function,
    },
  },
  setup: (props, ctx) => {
    provide(_formKey, toRef(props, 'form'))
    const itemConfigs = props.itemConfigsPreHandler?.(props.itemConfigs) || props.itemConfigs
    return () => (
      <ElForm {...props.formConfigs} model={props.form}>{itemConfigs.map(config => {
        const Component = getComponent(config.component.name)
        let customSlot = null;
        if (config.component.name === 'custom') {
          customSlot = config.component.customSlot
        }
        const {name, ...extra} = config.component

        return (
          <Component
            key={config.prop}
            config={{
              prop: config.prop,
              label: config.label,
            }}
            extra={extra}
            v-slots={{
              default: isString(customSlot) ? ctx.slots[customSlot] : customSlot
            }}
          />
         )
      })}</ElForm>
    )
  }
})

export default Form
