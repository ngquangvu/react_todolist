import type { FC } from 'react'

export type IconProps = {
  url: string
  alt: string
}

export const Icon: FC<IconProps> = ({ url, alt }) => {
  return <img className="h-full" src={url} alt={alt} />
}
