/// <reference types="vite-plugin-svgr/client" />
import {Theme, useTheme} from "../../../app/providers/ThemeProvider";
import {Button, ThemeButton} from "../../ui/Button/Button.tsx";
import classnames from "classnames";
import DarkIcon from '../../../assets/icons/theme-dark.svg?react'
import LightIcon from '../../../assets/icons/theme-light.svg?react'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher = ({ className = '' }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme()

  const ThemeSwitcherClass = classnames({
      [className]: true
  })

  return (
        <Button
            theme={ThemeButton.CLEAR}
            className={ThemeSwitcherClass}
            onClick={toggleTheme}>
            {theme === Theme.DARK ? <DarkIcon/> : <LightIcon/>}
        </Button>
  )
}
