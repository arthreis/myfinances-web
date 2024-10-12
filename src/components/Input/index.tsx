import React from 'react'
import { forwardRef, type ComponentProps } from 'react'
import { InputCustom } from './styles'
// import { twMerge } from 'tailwind-merge'

type InputProps = ComponentProps<'input'>

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <InputCustom
      {...props}
      ref={ref}
    />
    // <input
    //   {...props}
    //   ref={ref}
    // />
  )
})
export default Input;

Input.displayName = 'Input'
