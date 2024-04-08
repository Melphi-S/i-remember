import Switcher, { SwitcherTypes } from "../ui/Switcher/Switcher.tsx";
import { useTheme } from "../../hooks/useTheme.ts";
import { Theme } from "../../store/reducers/AppSlice.ts";
import { FC, InputHTMLAttributes } from "react";

interface SwitcherProps extends InputHTMLAttributes<HTMLInputElement> {
  isInvertedBackground?: boolean;
}

const ThemeSwitcher: FC<SwitcherProps> = ({ isInvertedBackground }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Switcher
      isInvertedBackground={isInvertedBackground}
      type={SwitcherTypes.THEME}
      onChange={toggleTheme}
      checked={theme === Theme.DARK}
    />
  );
};

export default ThemeSwitcher;
