import s from './Button.module.scss'
import type { ButtonHTMLAttributes } from 'react';

interface TButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text?: string;
}

export const Button = (props: TButton) => {
  const { text = 'button', className, ...prop } = props;
  return (
    <>
      <button
        {...prop}
        className={`${className} ${s.button}`}>
        {text}
      </button>
    </>
  )
}