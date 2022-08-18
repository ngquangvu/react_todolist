import type { FC } from 'react'

export type ButtonProps = {
  type: 'button' | 'submit' | undefined
  className: string
  onClick: () => void
  text: string
}

export const Button: FC<ButtonProps> = ({ type, className, onClick, text }) => {
  return (
    <button
      className={`${className} inline-block px-6 py-2 font-medium text-xs leading-tight rounded focus:shadow-lg focus:outline-none focus:ring-0 hover:shadow-lg shadow-md active:shadow-lg transition duration-150 ease-in-out `}
      // bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700  active:bg-blue-800
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

// type ButtonProps = {
//   text: string
//   props: ComponentPropsWithoutRef<'button'>
// }

// export const Button: FC<ButtonProps> = ({ text, ...props }) => {
//   return <button {...props}>{text}</button>
// }
