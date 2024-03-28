import styles from "../../pages/Main/ui/MainPage.module.scss";
import Sticker from "../Sticker/Sticker.tsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useAppSelector } from "../../store/store.ts";

const WordsSwiper = () => {
  const { vocabulary } = useAppSelector((state) => state.vocabulary);

  return (
    <>
      {vocabulary && (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={3}
          navigation
        >
          {vocabulary.vocabularyWords
            .filter((word) => word.status === 1)
            .map(({ word, id }) => {
              return (
                <SwiperSlide key={id} className={styles.slide}>
                  <Sticker word={word} wordId={id} />
                </SwiperSlide>
              );
            })}
        </Swiper>
      )}
    </>
  );
};

export default WordsSwiper;