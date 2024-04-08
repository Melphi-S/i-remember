import { FC } from "react";
import styles from "./TableList.module.scss";
import VocabularyItem from "../../../../../components/VocabularyItem/VocabularyItem.tsx";
import { VocabularyWord } from "../../../../../api/models/Vocabulary.ts";
import {useTranslation} from "react-i18next";

interface TableListProps {
  words: VocabularyWord[];
}

const TableList: FC<TableListProps> = ({ words }) => {
  const {t} = useTranslation()

  return (
    <>
      {words.length ? (
        <ul className={styles.list}>
          {words.map((word) => (
            <VocabularyItem key={word.id} word={word} />
          ))}
        </ul>
      ) : <p className={styles.noWords}>{t('no such words')}</p>}
    </>
  );
};

export default TableList;
