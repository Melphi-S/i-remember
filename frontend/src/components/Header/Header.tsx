import styles from "./Header.module.scss";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher.tsx";
import LangSwitcher from "../LangSwitcher/LangSwitcher.tsx";
import ProfileButton from "../ProfileButton/ProfileButton.tsx";
import { Dispatch, FC, SetStateAction } from "react";
import Navigation from "../Navigation/Navigation.tsx";
import { useLocation } from "react-router-dom";
import { RoutePath } from "../../config/routeConfig";
import Logo from "../Logo/Logo.tsx";

interface HeaderProps {
  onProfileButtonClick: Dispatch<SetStateAction<boolean>>;
}

const Header: FC<HeaderProps> = ({ onProfileButtonClick }) => {

  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      <Logo />
      {pathname === RoutePath.login_page ? (
        <div className={styles.switchers}>
          <ThemeSwitcher />
          <LangSwitcher />
        </div>
      ) : (
        <>
          <Navigation />
          <ProfileButton onClick={onProfileButtonClick} />
        </>
      )}
    </header>
  );
};

export default Header;
