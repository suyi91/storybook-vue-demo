import { defineComponent, inject, provide, ref, toRef } from "vue";
import { ElForm } from 'element-plus'
import { CustomFormItem } from './components/LEGO/FormItem'
import Layout from "./Layout";

const isString = val => typeof val === 'string';

const registerCustomItemFn = registry => (name, Comp) => {
  registry[name] = defineComponent({
    props: {
      config: {
        type: Object,
        required: true,
      },
      extra: {
        type: Object,
        required: true,
      }
    },
    setup: (props) => {
      const form = inject(_formKey, {});
      const value = toRef(form.value, props.config.prop)
      return () => (
        <CustomFormItem
          config={props.config}
        >{{default: () => <Comp v-model={value.value} compProps={props.extra.compProps} extra={props.extra} />}}</CustomFormItem>
      )
    }
  })
  return registry[name];
}

// 全局自定义组件注册表
const globalCustomRegistry = {}

export const registerGlobalCustomItem = registerCustomItemFn(globalCustomRegistry)

const getGlobalCustomItem = name => globalCustomRegistry[name]

const getGlobalComponent = compName => {
  const CustomComp = getGlobalCustomItem(compName)
  if (CustomComp) return CustomComp
  switch(compName) {
    case 'custom':
      return CustomFormItem;
    default:
      return null;
  }
}
export const _formKey = '__syForm';

const Form = defineComponent({
  name: 'Form',
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    formConfig: {
      type: Object,
      default: () => ({}),
    },
    formCustomComps: {
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
  expose: ['validate', 'validateField', 'scrollToField', 'resetFields', 'clearValidate'],
  setup: (props) => {
    // 自定义组件注册表
    const customRegistry = {}
    const registerCustomItem = registerCustomItemFn(customRegistry)
    Object.entries(props.formCustomComps).forEach(([key, Comp]) => {
      registerCustomItem(key, Comp)
    })
    provide(_formKey, toRef(props, 'model'))
    const itemConfigs = props.itemConfigsPreHandler?.(props.itemConfigs) ?? props.itemConfigs

    const formRef = ref()
    const formMethods = {};
    ['validate', 'validateField', 'scrollToField', 'resetFields', 'clearValidate'].forEach(key => {
      formMethods[key] = (...args) => formRef.value?.[key](...args)
    })

    return {
      itemConfigs,
      customRegistry,

      formRef,
      ...formMethods,
    }
  },
  render() {
    const renderFormItem = formItemConfig => {
      const Component = this.customRegistry[formItemConfig.component.name] ?? getGlobalComponent(formItemConfig.component.name)
      let customSlot = null;
      if (formItemConfig.component.name === 'custom') {
        customSlot = formItemConfig.component.customSlot
      }
      const {name, ...extra} = formItemConfig.component

      if (!Component) return null
      return (
        <Component
          key={formItemConfig.prop}
          config={{
            prop: formItemConfig.prop,
            label: formItemConfig.label,
            ...formItemConfig.itemProps,
          }}
          extra={extra}
          v-slots={{
            default: isString(customSlot) ? this.$slots[customSlot] : customSlot
          }}
        />
      )
    }
    let content;
    if (this.formConfig.layout === 'flex') {
      content = <Layout config={{
        type: 'flex',
        children: this.itemConfigs.map(config => ({
          layout: config.layout,
          content: renderFormItem(config),
          customClass: config.customClass,
          customStyle: config.customStyle,
        }))
      }} />
    } else {
      content = this.itemConfigs.map(config => renderFormItem(config))
    }
    return (
      <ElForm ref="formRef" {...this.formConfig} model={this.model}>{content}</ElForm>
    )
  }
})

export default Form
