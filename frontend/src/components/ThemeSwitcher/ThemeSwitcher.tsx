import Switcher, {SwitcherTypes} from "../ui/Switcher/Switcher.tsx";
import {Theme, useTheme} from "../../app/providers/ThemeProvider";

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <Switcher type={SwitcherTypes.THEME} onChange={toggleTheme} checked={theme === Theme.DARK}/>
    );
};

export default ThemeSwitcher;