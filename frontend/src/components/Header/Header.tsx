import styles from './Header.module.scss';
import Logo from "../LogoMock/Logo.tsx";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher.tsx";
import LangSwitcher from "../LangSwitcher/LangSwitcher.tsx";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.switchers}>
                <ThemeSwitcher/>
                <LangSwitcher/>
            </div>
            <Logo/>
        </header>
    );
};

export default Header;