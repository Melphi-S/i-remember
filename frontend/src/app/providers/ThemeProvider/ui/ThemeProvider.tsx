import { ReactNode, useMemo, useState } from 'react'
import { LOCAL_STORAGE_THEME_KEY, ThemeContext } from '../lib/ThemeContext'

enum Theme {
  DARK = 'dark',
  LIGHT = 'light'
}

interface Props {
  children: ReactNode
}

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme ?? Theme.LIGHT

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  const defaultProps = useMemo(() => ({
    theme,
    setTheme
  }), [theme])

  return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
  )
}

export default ThemeProvider
