import styles from "./VocabularyItem.module.scss";
import { VocabularyWord } from "../../api/models/Vocabulary.ts";
import { FC } from "react";
import { VocabularyWordsStatuses } from "../../api/types";
import { useTranslation } from "react-i18next";
import AudioButton from "../ui/AudioButton/AudioButton.tsx";
import { AudioButtonSizes } from "../ui/AudioButton/types";
import {StatusToDisplay} from "./types";

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

  const statusToDisplay = Statuses.get(status) as string;

  const date = `${String(new Date(createdAt).getDate()).padStart(2, "0")}.${String(new Date(createdAt).getMonth()).padStart(2, "0")}.${String(new Date(createdAt).getFullYear()).slice(-2)}`;

  return (
    <li className={styles.item}>
      <span className={styles.withPadding}>{vocabularyWord.en}</span>
        <AudioButton
            voice={vocabularyWord.voice}
            size={AudioButtonSizes.SMALL}
            useTheme={true}
        />
      <span>{vocabularyWord.tr}</span>
      <span>{vocabularyWord.ru}</span>
      <span>{t(`${statusToDisplay}`)}</span>
      <span className={styles.justifyCenter}>{isFailed ? "yes" : "no"}</span>
      <span className={styles.justifyCenter}>{failedTasks}</span>
      <span className={styles.justifyCenter}>{date}</span>
    </li>
  );
};

export default VocabularyItem;
