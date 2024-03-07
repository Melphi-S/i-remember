import styles from './MainPage.module.scss'
import Block from "../../../components/Block/Block.tsx";

const MainPage = () => {
    return (
        <div className={styles.main}>
            <Block/>
            <Block/>
            <Block/>
            <Block/>
        </div>
    );
};

export default MainPage;