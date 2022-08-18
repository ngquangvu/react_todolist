import type { ComponentPropsWithoutRef, FC } from 'react'

export const Input: FC<ComponentPropsWithoutRef<'input'>> = ({ ...props }) => {
  return <input {...props} />
}
