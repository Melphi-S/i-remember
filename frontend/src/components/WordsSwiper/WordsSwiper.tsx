import styles from "../../pages/Main/ui/MainPage.module.scss";
import Sticker from "../Sticker/Sticker.tsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useResize } from "../../hooks/useResize.tsx";
import { VocabularyWord } from "../../api/models/Vocabulary.ts";
import { FC } from "react";

interface WordsSwiperProps {
  newWords: VocabularyWord[];
}

const WordsSwiper: FC<WordsSwiperProps> = ({ newWords }) => {
  const { isTabletScreen, isMobileScreen } = useResize();

  const getNumberOfSlides = () => {
    if (!newWords) {
      return 1;
    }

    if (newWords.length < 2 || isMobileScreen) {
      return 1;
    }

    if (newWords.length < 3 || isTabletScreen) {
      return 2;
    }

    return 3;
  };

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={10}
      slidesPerView={getNumberOfSlides()}
      navigation
    >
      {newWords.map(({ word, id }) => {
        return (
          <SwiperSlide key={id} className={styles.slide}>
            <Sticker word={word} wordId={id} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default WordsSwiper;
