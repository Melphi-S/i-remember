import styles from "./DetailedInfoModal.module.scss";
import { VocabularyWord } from "../../../../api/models/Vocabulary.ts";
import { FC } from "react";
import Modal from "../../../Modal/Modal.tsx";
import { useTranslation } from "react-i18next";
import AudioButton from "../../../ui/AudioButton/AudioButton.tsx";
import { AudioButtonSizes } from "../../../ui/AudioButton/types";
import { Statuses } from "../../VocabularyItem.tsx";
import { VocabularyWordsStatuses } from "../../../../api/types";
import YesNoButton from "../../../ui/YesNoButton/YesNoButton.tsx";
import { YesNoButtons } from "../../../ui/YesNoButton/types";

interface DetailedInfoModalProps {
  closeModal: () => void;
  word: VocabularyWord;
  openStatusModal: () => void;
}

const DetailedInfoModal: FC<DetailedInfoModalProps> = ({
  word,
  closeModal,
  openStatusModal,
}) => {
  const {
    word: vocabularyWord,
    status,
    isFailed,
    failedTasks,
    createdAt,
  } = word;

  const { t } = useTranslation();

  const statusToDisplay = Statuses.get(status) as string;

  const date = `${String(new Date(createdAt).getDate()).padStart(2, "0")}.${String(new Date(createdAt).getMonth()).padStart(2, "0")}.${String(new Date(createdAt).getFullYear()).slice(-2)}`;

  return (
    <Modal closeModal={closeModal} isCloseButton={true}>
      <div className={styles.modal}>
        <div className={styles.parameter}>
          <span className={styles.title}>{t("word title")}</span>
          <span className={styles.value}>{vocabularyWord.en}</span>
        </div>
        <div className={styles.parameter}>
          <span className={styles.title}>{t("audio title")}</span>
          <AudioButton
            voice={vocabularyWord.voice}
            size={AudioButtonSizes.SMALL}
            useTheme={true}
          />
        </div>
        <div className={styles.parameter}>
          <span className={styles.title}>{t("transcription title")}</span>
          <span className={styles.value}>{vocabularyWord.tr}</span>
        </div>
        <div className={styles.parameter}>
          <span className={styles.title}>{t("translation title")}</span>
          <span className={styles.value}>{vocabularyWord.ru}</span>
        </div>
        <div className={styles.parameter}>
          <span className={styles.title}>{t("status title")}</span>
          <span className={styles.value}>{t(`${statusToDisplay}`)}</span>
        </div>
        <div className={styles.parameter}>
          <span className={styles.title}>{t("mistake title")}</span>
          <span className={styles.value}>{isFailed ? t("yes") : t("no")}</span>
        </div>
        <div className={styles.parameter}>
          <span className={styles.title}>{t("total mistakes title")}</span>
          <span className={styles.value}>{failedTasks}</span>
        </div>
        <div className={styles.parameter}>
          <span className={styles.title}>{t("date title")}</span>
          <span className={styles.value}>{date}</span>
        </div>
        {word.status === VocabularyWordsStatuses.BANNED ? (
          <YesNoButton onClick={openStatusModal} buttonType={YesNoButtons.YES}>
            {t("accept")}
          </YesNoButton>
        ) : (
          <YesNoButton onClick={openStatusModal} buttonType={YesNoButtons.NO}>
            {t("reject")}
          </YesNoButton>
        )}
      </div>
    </Modal>
  );
};

export default DetailedInfoModal;
