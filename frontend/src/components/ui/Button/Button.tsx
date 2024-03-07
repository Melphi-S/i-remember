import styles from './Button.module.scss'
import { type ButtonHTMLAttributes, type FC } from 'react'
import classnames from "classnames";

export enum ThemeButton {
  CLEAR = 'clear',
  OUTLINED = 'outlined'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ThemeButton
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className = '',
    children,
    theme = '',
    ...rest
  } = props

  const buttonClass = classnames({
    [className]: true,
    [styles.button]: true,
    [styles[theme]]: true,
  });

  return (
        <button
            className={buttonClass}
            {...rest}
        >
            {children}
        </button>
  )
}
