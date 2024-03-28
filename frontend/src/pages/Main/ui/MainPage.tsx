import styles from "./MainPage.module.scss";
import Block from "../../../components/Block/Block.tsx";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import WordsSwiper from "../../../components/WordsSwiper/WordsSwiper.tsx";

const MainPage = () => {
  return (
    <main className={styles.main}>
      <Block className={styles.new}>
        <WordsSwiper />
      </Block>
      <Block className={styles.daylies} />
      <Block className={styles.stats} />
    </main>
  );
};

export default MainPage;
