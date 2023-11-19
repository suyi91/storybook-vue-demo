import { h } from 'vue'

export const CustomTableCell = props => props.vnodes;

export const BasicTableCell = props => (
  <CustomTableCell vnodes={props.content} />
)

export const HtmlTableCell = props => {
  const tag = props.tag || 'span'
  return (
    <CustomTableCell vnodes={
      h(tag, { innerHTML: props.content })
    } />
  )
}