import styles from './Header.module.scss';
import Logo from "../LogoMock/Logo.tsx";
import {ThemeSwitcher} from "../ThemeSwitcher";

const Header = () => {
    return (
        <header className={styles.header}>
            <ThemeSwitcher/>
            <Logo/>
        </header>
    );
};

export default Header;