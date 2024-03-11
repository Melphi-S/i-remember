import Switcher, {SwitcherTypes} from "../ui/Switcher/Switcher.tsx";
import {useTheme} from "../../hooks/useTheme.ts";
import {Theme} from "../../store/reducers/AppSlice.ts";

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <Switcher type={SwitcherTypes.THEME} onChange={toggleTheme} checked={theme === Theme.DARK}/>
    );
};

export default ThemeSwitcher;