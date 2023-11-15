export const CustomTableCell = props => props.vnodes;

export const BasicTableCell = props => (
  <CustomTableCell vnodes={props.content} />
)
