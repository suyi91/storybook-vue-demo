import { defineComponent, provide, toRef } from "vue";
import { ElForm } from 'element-plus'
import { CustomFormItem, InputFormItem } from './components/LEGO/FormItem'

const formConfigs = [
  {
    prop: 'name',
    label: 'Activity name',
    component: {
      name: 'custom'
    },
  },
  {
    prop: 'name2',
    label: 'Activity name2',
    component: {
      name: 'input'
    },
  },
]

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
    }
  },
  setup: (props, ctx) => {
    provide(_formKey, toRef(props, 'form'))
    return () => (
      <ElForm model={props.form}>{formConfigs.map(config => {
        const Component = getComponent(config.component.name)
        return (
          <Component
            key={config.prop}
            config={{
              prop: config.prop,
              label: config.label,
            }}
          />
         )
      })}</ElForm>
    )
  }
})

export default Form