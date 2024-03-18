import styles from "./Header.module.scss";
import Logo from "../LogoMock/Logo.tsx";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher.tsx";
import LangSwitcher from "../LangSwitcher/LangSwitcher.tsx";
import ProfileButton from "../ProfileButton/ProfileButton.tsx";
import { useAppSelector } from "../../store/store.ts";
import {Dispatch, FC, SetStateAction} from "react";

interface HeaderProps {
    onProfileButtonClick: Dispatch<SetStateAction<boolean>>
}

const Header: FC<HeaderProps> = ({onProfileButtonClick}) => {
  const { user } = useAppSelector((store) => store.user);

  return (
    <header className={styles.header}>
      <div className={styles.switchers}>
        <ThemeSwitcher />
        <LangSwitcher />
      </div>
      <Logo />
      {user && <ProfileButton onClick={onProfileButtonClick} />}
    </header>
  );
};

export default Header;
