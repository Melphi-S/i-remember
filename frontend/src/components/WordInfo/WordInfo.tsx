/// <reference types="vite-plugin-svgr/client" />
import styles from "./WordInfo.module.scss";
import { FC } from "react";
import { Word } from "../../api/models/Vocabulary.ts";
import { WordInfoType } from "./types";
import AudioButton from "../ui/AudioButton/AudioButton.tsx";

interface WordInfoProps {
  word: Word;
  type?: WordInfoType;
}

const WordInfo: FC<WordInfoProps> = ({ word, type = WordInfoType.OPENED }) => {
  const { en, ru, tr, voice } = word;

  return (
    <div className={styles.info}>
      {type === WordInfoType.OPENED && (
        <>
          <h2 className={styles.word}>{en}</h2>
          <p className={styles.transcription}>{tr}</p>
        </>
      )}
      <p className={styles.translation}>{ru}</p>
      {type === WordInfoType.OPENED && <AudioButton voice={voice} />}
    </div>
  );
};

export default WordInfo;
