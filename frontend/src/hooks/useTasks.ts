import { useAppSelector } from "../store/store.ts";
import { VocabularyWordsStatuses } from "../api/types";

export function useTasks() {
  const { vocabulary } = useAppSelector((state) => state.vocabulary);

  let dailyTasks, weeklyTasks, monthlyTasks;

  if (vocabulary) {
    dailyTasks = vocabulary.vocabularyWords.filter(
      (word) => word.status === VocabularyWordsStatuses.IN_DAILY,
    );
    weeklyTasks = vocabulary.vocabularyWords.filter(
      (word) => word.status === VocabularyWordsStatuses.IN_WEEKLY,
    );
    monthlyTasks = vocabulary.vocabularyWords.filter(
      (word) => word.status === VocabularyWordsStatuses.IN_MONTHLY,
    );
  }

  return { dailyTasks, weeklyTasks, monthlyTasks };
}
