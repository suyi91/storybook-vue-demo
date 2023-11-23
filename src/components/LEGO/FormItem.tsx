import { ElFormItem } from 'element-plus'

export const CustomFormItem = (props) => {
  return (
    <ElFormItem {...props.config}>{props.vnodes}</ElFormItem>
  )
}

export const InputFormItem = (props) => {
  const vnodes = <ElInput />
  return (
    <CustomFormItem 
      {...{
        config: props.config,
        vnodes,
      }}
    />
  )
}