import styles from './MainPage.module.scss'
import Block from "../../../components/Block/Block.tsx";
import Sticker from "../../../components/Sticker/Sticker.tsx";

const MainPage = () => {
    return (
        <main className={styles.main}>
            <Block/>
            <Block>
                <Sticker>Bird</Sticker>
                <Sticker>Fancy</Sticker>
                <Sticker>Water</Sticker>
            </Block>
            <Block/>
            <Block/>
        </main>
    );
};

export default MainPage;