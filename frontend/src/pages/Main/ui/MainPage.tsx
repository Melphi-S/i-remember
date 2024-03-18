import styles from './MainPage.module.scss'
import Block from "../../../components/Block/Block.tsx";
import Sticker from "../../../components/Sticker/Sticker.tsx";

const MainPage = () => {
    return (
        <main className={styles.main}>
            <Block className={styles.new}>
                <Sticker>Bird</Sticker>
                <Sticker>Fancy</Sticker>
                <Sticker>Water</Sticker>
            </Block>
            <Block className={styles.daylies}/>
            <Block className={styles.stats}/>
        </main>
    );
};

export default MainPage;