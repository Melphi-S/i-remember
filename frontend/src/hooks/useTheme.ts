import {LOCAL_STORAGE_THEME_KEY, Theme, setTheme} from "../store/reducers/AppSlice.ts";
import {useAppDispatch, useAppSelector} from "../store/store.ts";


interface UseThemeResult {
    toggleTheme: () => void
    theme: Theme
}
export function useTheme (): UseThemeResult {
    const { theme } = useAppSelector(state => state.app)
    const dispatch = useAppDispatch();

    const toggleTheme = () => {
        const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
        dispatch(setTheme(newTheme))
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
    }

    return { theme, toggleTheme }
}
