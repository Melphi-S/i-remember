import styles from "./Header.module.scss";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher.tsx";
import LangSwitcher from "../LangSwitcher/LangSwitcher.tsx";
import ProfileButton from "../ProfileButton/ProfileButton.tsx";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation.tsx";
import Logo from "../Logo/Logo.tsx";
import { useResize } from "../../hooks/useResize.tsx";
import MenuButton from "../ui/MenuButton/MenuButton.tsx";
import BurgerMenu from "./BurgerMenu/BurgerMenu.tsx";
import { useAppSelector } from "../../store/store.ts";

interface HeaderProps {
  onProfileButtonClick: Dispatch<SetStateAction<boolean>>;
}

const Header: FC<HeaderProps> = ({ onProfileButtonClick }) => {

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const { user } = useAppSelector((state) => state.user);

  const { isLaptopScreen } = useResize();

  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpened(false);
    };

    window.addEventListener("resize", handleResize);

    return () => window.addEventListener("resize", handleResize);
  }, [isLaptopScreen]);

  return (
    <header className={styles.header}>
      {isLaptopScreen && user && (
        <MenuButton
          isChecked={isMenuOpened}
          onClick={() => setIsMenuOpened((prev) => !prev)}
        />
      )}
      <Logo />
      {!user ? (
        <div className={styles.switchers}>
          <ThemeSwitcher />
          <LangSwitcher />
        </div>
      ) : (
        <>
          {!isLaptopScreen && <Navigation />}
          <ProfileButton onClick={onProfileButtonClick} />
        </>
      )}
      {isMenuOpened && (
        <BurgerMenu handleClose={() => setIsMenuOpened(false)} />
      )}
    </header>
  );
};

export default Header;
