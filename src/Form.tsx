import { defineComponent } from "vue";
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

const Form = defineComponent({
  setup: (props, ctx) => {
    return () => (
      <ElForm>{formConfigs.map(config => {
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