import styles from "./VocabularyPage.module.scss";
import { useAppSelector } from "../../../store/store.ts";
import { VocabularyWordsStatuses } from "../../../api/types";
import Select, { Option } from "../../../components/ui/Select/Select.tsx";
import { useMemo, useState } from "react";
import { SingleValue } from "react-select";
import {
  useWordsSorting,
  LOCAL_STORAGE_SORTING_KEY,
} from "../../../hooks/useWordsSorting.ts";
import Input from "../../../components/ui/Input/Input.tsx";
import { useTranslation } from "react-i18next";
import StatusCheckboxes, {
  Checkboxes,
} from "./parts/StatusCheckboxes/StatusCheckboxes.tsx";
import TableHeader from "./parts/TableHeader/TableHeader.tsx";
import TableList from "./parts/TableList/TableList.tsx";
import { StatusToDisplay } from "../../../components/VocabularyItem/types";
import { Statuses } from "../../../components/VocabularyItem/VocabularyItem.tsx";

const defaultStatuses: Checkboxes = {
  [StatusToDisplay.NEW]: true,
  [StatusToDisplay.CHECKED_DAILY]: true,
  [StatusToDisplay.CHECKED_WEEKLY]: true,
  [StatusToDisplay.CHECKED_MONTHLY]: true,
  [StatusToDisplay.BANNED]: false,
};

const VocabularyPage = () => {
  const { vocabulary } = useAppSelector((state) => state.vocabulary);

  const vocabularyWords = [...(vocabulary?.vocabularyWords || [])].filter(
    (word) => word.status !== VocabularyWordsStatuses.NEW,
  );

  const { t } = useTranslation();

  const { sortBy, setSortBy, sortWords, sortingOptions } = useWordsSorting();

  const [filter, setFilter] = useState("");

  const [statusToDisplay, setStatusToDisplay] = useState(defaultStatuses);

  const handleSortChanging = (value: SingleValue<Option>) => {
    if (value) {
      setSortBy(value);
      localStorage.setItem(LOCAL_STORAGE_SORTING_KEY, value.value);
    }
  };

  const sortedWords = useMemo(
    () => sortWords(vocabularyWords, sortBy?.value),
    [vocabularyWords, sortBy, sortWords],
  );

  const filteredWords = useMemo(
    () =>
      sortedWords.filter(
        (word) =>
          word.word.en.includes(filter) || word.word.ru.includes(filter),
      ),
    [filter, sortedWords],
  );

  const checkedWords = useMemo(
    () =>
      filteredWords.filter(
        (word) => statusToDisplay[Statuses.get(word.status) as StatusToDisplay],
      ),
    [filteredWords, statusToDisplay],
  );

  return (
    <main className={styles.page}>
      <div className={styles.options}>
        <div className={styles.inputWrapper}>
          <Input
            placeholder={t("find word or translation")}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            noErrorHandling={true}
          />
          <Select
            options={sortingOptions}
            title={t("sort by")}
            selectedOption={sortBy}
            setSelectedOption={handleSortChanging}
          />
        </div>
        <StatusCheckboxes
          checkboxes={statusToDisplay}
          setCheckboxes={setStatusToDisplay}
        />
      </div>
      <TableHeader />
      <TableList words={checkedWords} />
    </main>
  );
};

export default VocabularyPage;
