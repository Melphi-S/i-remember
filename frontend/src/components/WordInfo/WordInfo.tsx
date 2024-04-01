/// <reference types="vite-plugin-svgr/client" />
import styles from "./WordInfo.module.scss";
import { FC, useEffect, useState } from "react";
import Spinner, { SpinnerTypes } from "../ui/Spinner/Spinner.tsx";
import { Word } from "../../api/models/Vocabulary.ts";
import AudioIcon from "../../assets/icons/audio.svg?react";
import NoAudioIcon from "../../assets/icons/no-audio.svg?react";
import { WordInfoType } from "./types";

interface WordInfoProps {
  word: Word;
  type?: WordInfoType;
}

const WordInfo: FC<WordInfoProps> = ({ word, type = WordInfoType.OPENED }) => {
  const { en, ru, tr, voice } = word;

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (voice) {
      const audio = new Audio(voice);
      const setLoadedAudio = () => setAudio(audio);
      audio.addEventListener("canplaythrough", setLoadedAudio, false);

      return () => audio.removeEventListener("canplaythrough", setLoadedAudio);
    }
  }, [voice]);

  const playAudio = async () => {
    try {
      await audio?.play();
      console.log("Playing...");
    } catch (err) {
      console.log("Failed to play..." + err);
    }
  };

  return (
    <div className={styles.info}>
      {type === WordInfoType.OPENED && (
        <>
          <h2 className={styles.word}>{en}</h2>
          <p className={styles.transcription}>{tr}</p>
        </>
      )}
      <p className={styles.translation}>{ru}</p>
      {type === WordInfoType.OPENED && (
        <>
          <div className={styles.audioContainer}>
            {!voice && <NoAudioIcon className={styles.noAudioIcon} />}
            {voice && !audio && <Spinner type={SpinnerTypes.AUDIO} />}
            {voice && audio && (
              <a href="#" onClick={playAudio}>
                <AudioIcon className={styles.audioIcon} />
              </a>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WordInfo;
