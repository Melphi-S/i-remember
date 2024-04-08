import { useEffect, useState } from "react";
import { Option } from "../components/ui/Select/Select.tsx";
import { VocabularyWord } from "../api/models/Vocabulary.ts";
import { useTranslation } from "react-i18next";

enum SortingOptions {
  ABC_UP = "abcUp",
  ABC_DOWN = "abcDown",
  MISTAKES_UP = "mistakesUp",
  MISTAKES_DOWN = "mistakesDown",
  DATE_UP = "dateUp",
  DATE_DOWN = "dateDown",
}

interface WordSorting {
  value: SortingOptions;
  label: string;
}

export const LOCAL_STORAGE_SORTING_KEY = "sorting";

export function useWordsSorting() {
  const { t, i18n } = useTranslation();

  const sortingOptions: WordSorting[] = [
    { value: SortingOptions.ABC_UP, label: t("alphabet ↓") },
    { value: SortingOptions.ABC_DOWN, label: t("alphabet ↑") },
    { value: SortingOptions.MISTAKES_UP, label: t("total mistakes ↓") },
    { value: SortingOptions.MISTAKES_DOWN, label: t("total mistakes ↑") },
    { value: SortingOptions.DATE_UP, label: t("date of receipt ↓") },
    { value: SortingOptions.DATE_DOWN, label: t("date of receipt ↑") },
  ];

  const defaultSorting: WordSorting = {
    value: SortingOptions.DATE_UP,
    label: t("date of receipt ↓"),
  };

  const [sortBy, setSortBy] = useState<Option>(
    sortingOptions.find(
      (item) => item.value === localStorage.getItem(LOCAL_STORAGE_SORTING_KEY),
    ) ?? defaultSorting,
  );

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_SORTING_KEY)) {
      const option = sortingOptions.find(
        (item) =>
          item.value === localStorage.getItem(LOCAL_STORAGE_SORTING_KEY),
      );
      if (option) {
        setSortBy(option)
      }
    }
  }, [i18n.language]);

  const sortWords = (array: VocabularyWord[], sortBy: string) => {
    const getComparator = () => {
      switch (sortBy) {
        case SortingOptions.ABC_UP:
          return (word1: VocabularyWord, word2: VocabularyWord) =>
            word1.word.en.localeCompare(word2.word.en);
        case SortingOptions.ABC_DOWN:
          return (word1: VocabularyWord, word2: VocabularyWord) =>
            word2.word.en.localeCompare(word1.word.en);
        case SortingOptions.MISTAKES_UP:
          return (word1: VocabularyWord, word2: VocabularyWord) =>
            word2.failedTasks - word1.failedTasks;
        case SortingOptions.MISTAKES_DOWN:
          return (word1: VocabularyWord, word2: VocabularyWord) =>
            word1.failedTasks - word2.failedTasks;
        case SortingOptions.DATE_UP:
          return (word1: VocabularyWord, word2: VocabularyWord) =>
            new Date(word1.createdAt).getTime() -
            new Date(word2.createdAt).getTime();
        case SortingOptions.DATE_DOWN:
          return (word1: VocabularyWord, word2: VocabularyWord) =>
            new Date(word2.createdAt).getTime() -
            new Date(word1.createdAt).getTime();
        default:
          return (word1: VocabularyWord, word2: VocabularyWord) =>
            new Date(word1.createdAt).getTime() -
            new Date(word2.createdAt).getTime();
      }
    };

    return [...array].sort(getComparator());
  };

  return { sortBy, setSortBy, sortWords, sortingOptions };
}
