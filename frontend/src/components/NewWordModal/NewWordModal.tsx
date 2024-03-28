/// <reference types="vite-plugin-svgr/client" />
import styles from "./NewWordModal.module.scss";
import Modal from "../Modal/Modal.tsx";
import { FC, useEffect, useState } from "react";
import { Word } from "../../api/models/Vocabulary.ts";
import classnames from "classnames";
import { WordColors } from "../Sticker/types";
import { wordsApi } from "../../api/services/WordsService.ts";
import AudioIcon from "../../assets/icons/audio.svg?react";
import NoAudioIcon from "../../assets/icons/no-audio.svg?react";
import Spinner, { SpinnerTypes } from "../ui/Spinner/Spinner.tsx";
import YesNoButton from "../ui/YesNoButton/YesNoButton.tsx";
import { YesNoButtons, YesNoSize } from "../ui/YesNoButton/types";
import { useTranslation } from "react-i18next";

interface NewWordModalProps {
  closeModal: () => void;
  word: Word;
  wordId: number;
  color: WordColors;
}

const NewWordModal: FC<NewWordModalProps> = ({
  closeModal,
  word,
  wordId,
  color,
}) => {
  const { en, ru, tr, voice } = word;

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const [increase, { error: increaseError, isLoading: isIncreaseLoading }] =
    wordsApi.useIncreaseStatusMutation();
  const [decrease, { error: decreaseError, isLoading: isDecreaseLoading }] =
    wordsApi.useDecreaseStatusMutation();

  const wordInfoClass = classnames({
    [styles.wordInfo]: true,
    [styles[color]]: true,
  });

  const { t } = useTranslation();

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

  const handleAcceptButton = async (wordId: number) => {
    const result = await increase(wordId);

    if ("error" in result) {
      console.log(increaseError);
    } else {
      closeModal();
    }
  };

  const handleRejectButton = async (wordId: number) => {
    const result = await decrease(wordId);

    if ("error" in result) {
      console.log(decreaseError);
    } else {
      closeModal();
    }
  };

  return (
    <Modal closeModal={closeModal}>
      <div className={wordInfoClass}>
        <h2 className={styles.word}>{en}</h2>
        <p className={styles.transcription}>{tr}</p>
        <p className={styles.translation}>{ru}</p>
        <div className={styles.audioContainer}>
          {!voice && <NoAudioIcon className={styles.noAudioIcon} />}
          {voice && !audio && <Spinner type={SpinnerTypes.AUDIO} />}
          {voice && audio && (
            <a href="#" onClick={playAudio}>
              <AudioIcon className={styles.audioIcon} />
            </a>
          )}
        </div>
        <div className={styles.footer}>
          <div className={styles.buttonContainer}>
            {isIncreaseLoading ? (
              <Spinner />
            ) : (
              <YesNoButton
                buttonType={YesNoButtons.YES}
                size={YesNoSize.LARGE}
                disabled={isDecreaseLoading}
                onClick={() => handleAcceptButton(wordId)}
              >
                {t("accept")}
              </YesNoButton>
            )}
            {isDecreaseLoading ? (
              <Spinner />
            ) : (
              <YesNoButton
                buttonType={YesNoButtons.NO}
                size={YesNoSize.LARGE}
                disabled={isIncreaseLoading}
                onClick={() => handleRejectButton(wordId)}
              >
                {t("reject")}
              </YesNoButton>
            )}
          </div>
          <div className={styles.errorWrapper}>
            {(increaseError || decreaseError) && (
              <span className={styles.error}>{t("unknown request error")}</span>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NewWordModal;
