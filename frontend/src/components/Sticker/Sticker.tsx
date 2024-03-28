import styles from "./Sticker.module.scss";
import { FC, HTMLProps, useMemo, useState } from "react";
import classnames from "classnames";
import NewWordModal from "../NewWordModal/NewWordModal.tsx";
import { Word } from "../../api/models/Vocabulary.ts";
import { WordColors } from "./types";

interface StickerProps extends HTMLProps<HTMLDivElement> {
  className?: string;
  word: Word;
  wordId: number;
}

const colors = [
  { name: WordColors.YELLOW, hex: "#ff9" },
  { name: WordColors.GREEN, hex: "#cfc" },
  { name: WordColors.VIOLET, hex: "#ccf" },
];

const Sticker: FC<StickerProps> = (props) => {
  const { className = "", word, wordId, ...rest } = props;
  const [hovered, setHovered] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const stickerClass = classnames({
    [styles.sticker]: true,
    [styles.invisible]: isOpened,
    [className]: true,
  });

  const randomStyle = useMemo(
    () => ({
      degree:
        Math.ceil(Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1),
      color: colors[Math.floor(Math.random() * colors.length)],
    }),
    [],
  );

  return (
    <>
      <div
        className={stickerClass}
        style={
          !hovered
            ? {
                transform: `rotate(${randomStyle.degree}deg)`,
                backgroundColor: randomStyle.color.hex,
              }
            : { backgroundColor: randomStyle.color.hex }
        }
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setIsOpened(true)}
        {...rest}
      >
        {word.en}
      </div>
      {isOpened && (
        <NewWordModal
          color={randomStyle.color.name}
          closeModal={() => setIsOpened(false)}
          word={word}
          wordId={wordId}
        />
      )}
    </>
  );
};

export default Sticker;
