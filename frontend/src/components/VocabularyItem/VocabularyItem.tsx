import styles from "./VocabularyItem.module.scss";
import { VocabularyWord } from "../../api/models/Vocabulary.ts";
import { FC, useState } from "react";
import { VocabularyWordsStatuses } from "../../api/types";
import { useTranslation } from "react-i18next";
import AudioButton from "../ui/AudioButton/AudioButton.tsx";
import { AudioButtonSizes } from "../ui/AudioButton/types";
import { StatusToDisplay } from "./types";
import YesNoButton from "../ui/YesNoButton/YesNoButton.tsx";
import { YesNoButtons } from "../ui/YesNoButton/types";
import ChangeStatusModal from "./parts/ChangeStatusModal/ChangeStatusModal.tsx";
import { useResize } from "../../hooks/useResize.tsx";
import DetailedInfoModal from "./parts/DetailedInfoModal/DetailedInfoModal.tsx";

interface VocabularyItemProps {
  word: VocabularyWord;
}

export const Statuses: Map<VocabularyWordsStatuses, StatusToDisplay> = new Map([
  [VocabularyWordsStatuses.NEW, StatusToDisplay.NEW],
  [VocabularyWordsStatuses.BANNED, StatusToDisplay.BANNED],
  [VocabularyWordsStatuses.TO_DAILY, StatusToDisplay.NEW],
  [VocabularyWordsStatuses.IN_DAILY, StatusToDisplay.NEW],
  [VocabularyWordsStatuses.CHECKED_DAILY, StatusToDisplay.CHECKED_DAILY],
  [VocabularyWordsStatuses.IN_WEEKLY, StatusToDisplay.CHECKED_DAILY],
  [VocabularyWordsStatuses.CHECKED_WEEKLY, StatusToDisplay.CHECKED_WEEKLY],
  [VocabularyWordsStatuses.IN_MONTHLY, StatusToDisplay.CHECKED_WEEKLY],
  [VocabularyWordsStatuses.CHECKED_MONTHLY, StatusToDisplay.CHECKED_MONTHLY],
]);

const VocabularyItem: FC<VocabularyItemProps> = ({ word }) => {
  const {
    word: vocabularyWord,
    status,
    isFailed,
    failedTasks,
    createdAt,
  } = word;

  const { t } = useTranslation();

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const statusToDisplay = Statuses.get(status) as string;

  const date = `${String(new Date(createdAt).getDate()).padStart(2, "0")}.${String(new Date(createdAt).getMonth()).padStart(2, "0")}.${String(new Date(createdAt).getFullYear()).slice(-2)}`;

  const { isLaptopScreen, isTabletScreen, isMobileScreen } = useResize();

  const handleItemClick = () => {
    if (isLaptopScreen) {
      setIsInfoModalOpen(true);
    } else {
      return;
    }
  };

  return (
    <li className={styles.item} onClick={handleItemClick}>
      <span className={styles.withPadding}>{vocabularyWord.en}</span>
      {!isTabletScreen && (
        <>
          <AudioButton
            voice={vocabularyWord.voice}
            size={AudioButtonSizes.SMALL}
            useTheme={true}
          />
          <span>{vocabularyWord.tr}</span>
        </>
      )}
      <span>{vocabularyWord.ru}</span>
      {!isMobileScreen && <span>{t(`${statusToDisplay}`)}</span>}
      {!isLaptopScreen && (
        <>
          <span className={styles.justifyCenter}>
            {isFailed ? t("yes") : t("no")}
          </span>
          <span className={styles.justifyCenter}>{failedTasks}</span>
          <span className={styles.justifyCenter}>{date}</span>
          {word.status === VocabularyWordsStatuses.BANNED ? (
            <YesNoButton
              onClick={() => setIsStatusModalOpen(true)}
              buttonType={YesNoButtons.YES}
            >
              {t("accept")}
            </YesNoButton>
          ) : (
            <YesNoButton
              onClick={() => setIsStatusModalOpen(true)}
              buttonType={YesNoButtons.NO}
            >
              {t("reject")}
            </YesNoButton>
          )}
        </>
      )}
      {isStatusModalOpen && (
        <ChangeStatusModal
          word={word}
          closeModal={() => setIsStatusModalOpen(false)}
        />
      )}
      {isInfoModalOpen && (
        <DetailedInfoModal
          openStatusModal={() => setIsStatusModalOpen(true)}
          word={word}
          closeModal={() => setIsInfoModalOpen(false)}
        />
      )}
    </li>
  );
};

export default VocabularyItem;
