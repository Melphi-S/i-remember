import styles from './Header.module.scss';
import Logo from "../LogoMock/Logo.tsx";
import Switcher, {SwitcherTypes} from "../ui/Switcher/Switcher.tsx";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher.tsx";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.switchers}>
                <ThemeSwitcher/>
                <Switcher type={SwitcherTypes.LANGUAGE}/>
            </div>
            <Logo/>
        </header>
    );
};

export default Header;