import type { FC } from 'react'

export type LabelProps = {
  text: string
}

export const Label: FC<LabelProps> = ({ text }) => {
  return <span>{text}</span>
}
