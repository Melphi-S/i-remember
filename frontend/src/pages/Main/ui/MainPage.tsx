import styles from "./MainPage.module.scss";
import Block from "../../../components/Block/Block.tsx";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import WordsSwiper from "../../../components/WordsSwiper/WordsSwiper.tsx";
import Statistics from "../../../components/Statistics/Statistics.tsx";
import { useResize } from "../../../hooks/useResize.tsx";
import TaskBoardPanel from "../../../components/TaskBoardPanel/TaskBoardPanel.tsx";
import { useAppSelector } from "../../../store/store.ts";
import NoNewWordsBlock from "../../../components/NoNewWordsBlock/NoNewWordsBlock.tsx";

const MainPage = () => {
  const { vocabulary } = useAppSelector((state) => state.vocabulary);

  const newWords = vocabulary?.vocabularyWords.filter(
    (word) => word.status === 1,
  );

  const { isLaptopScreen } = useResize();

  return (
    <main className={styles.main}>
      <Block className={styles.new}>
        {newWords && newWords.length ? (
          <WordsSwiper newWords={newWords} />
        ) : (
          <NoNewWordsBlock />
        )}
      </Block>
      <Block className={styles.daylies}>
        <TaskBoardPanel />
      </Block>
      {!isLaptopScreen && (
        <Block className={styles.stats}>
          <Statistics />
        </Block>
      )}
    </main>
  );
};

export default MainPage;
