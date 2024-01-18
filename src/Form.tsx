import { defineComponent, provide, toRef } from "vue";
import { ElForm } from 'element-plus'
import { CustomFormItem, InputFormItem } from './components/LEGO/FormItem'

const isString = val => typeof val === 'string';

const getComponent = compName => {
  switch(compName) {
    case 'custom':
      return CustomFormItem;
    case 'input':
      return InputFormItem;
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
    itemConfigs: {
      type: Array,
      default: () => [],
    }
  },
  setup: (props, ctx) => {
    provide(_formKey, toRef(props, 'form'))
    return () => (
      <ElForm model={props.form}>{props.itemConfigs.map(config => {
        const Component = getComponent(config.component.name)
        let customSlot = null;
        if (config.component.name === 'custom') {
          customSlot = config.component.customSlot
        }

        return (
          <Component
            key={config.prop}
            config={{
              prop: config.prop,
              label: config.label,
            }}
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
