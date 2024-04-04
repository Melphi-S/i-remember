import styles from "./Statistics.module.scss";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/store.ts";
import { VocabularyWordsStatuses } from "../../api/types";
import Parameter from "./parts/Parameter/Parameter.tsx";
import { ParameterSize } from "./parts/Parameter/types";
import "react-circular-progressbar/dist/styles.css";
import { baseWordsApi } from "../../api/services/BaseWordsService.ts";
import ProgressBar from "../ProgressBar/ProgressBar.tsx";

enum ParameterType {
  REJECTED = "rejected",
  NEW = "new",
  ACCEPTED = "accepted",
  DAILY_CHECKED = "dailyChecked",
  WEEKLY_CHECKED = "weeklyChecked",
  MONTHLY_CHECKED = "monthlyChecked",
  TOTAL = "total",
}

type ParameterCount = {
  [parameter in ParameterType]: number;
};

const Statistics = () => {
  const { t } = useTranslation();

  const { vocabulary } = useAppSelector((state) => state.vocabulary);

  const statusToParameter: Map<VocabularyWordsStatuses, ParameterType> =
    new Map([
      [VocabularyWordsStatuses.BANNED, ParameterType.REJECTED],
      [VocabularyWordsStatuses.NEW, ParameterType.NEW],
      [VocabularyWordsStatuses.TO_DAILY, ParameterType.ACCEPTED],
      [VocabularyWordsStatuses.IN_DAILY, ParameterType.ACCEPTED],
      [VocabularyWordsStatuses.CHECKED_DAILY, ParameterType.DAILY_CHECKED],
      [VocabularyWordsStatuses.IN_WEEKLY, ParameterType.DAILY_CHECKED],
      [VocabularyWordsStatuses.CHECKED_WEEKLY, ParameterType.WEEKLY_CHECKED],
      [VocabularyWordsStatuses.IN_MONTHLY, ParameterType.WEEKLY_CHECKED],
      [VocabularyWordsStatuses.CHECKED_MONTHLY, ParameterType.MONTHLY_CHECKED],
    ]);

  const initialCount: ParameterCount = {
    [ParameterType.REJECTED]: 0,
    [ParameterType.NEW]: 0,
    [ParameterType.ACCEPTED]: 0,
    [ParameterType.DAILY_CHECKED]: 0,
    [ParameterType.WEEKLY_CHECKED]: 0,
    [ParameterType.MONTHLY_CHECKED]: 0,
    [ParameterType.TOTAL]: 0,
  };

  const parameters = vocabulary?.vocabularyWords.reduce((acc, word) => {
    acc[statusToParameter.get(word.status) as ParameterType] += 1;
    acc[ParameterType.TOTAL] += 1;
    return acc;
  }, initialCount) as ParameterCount;

  const { data, isLoading } = baseWordsApi.useGetNumberOfWordsQuery();

  return (
    <div className={styles.statistics}>
      <h2 className={styles.title}>{t("statistics")}</h2>
      <Parameter
        title={t("words in base")}
        index={data as number}
        size={ParameterSize.LARGE}
        isLoading={isLoading}
      />
      <Parameter
        title={t("total words")}
        index={parameters[ParameterType.TOTAL]}
        size={ParameterSize.LARGE}
      />
      <ProgressBar
        percentage={data ? parameters[ParameterType.TOTAL] / data : 0}
        size={180}
      />
      <Parameter
        title={t("new words")}
        index={parameters[ParameterType.NEW]}
        className={styles.withBottomMargin}
      />
      <Parameter
        title={t("accepted words")}
        index={parameters[ParameterType.ACCEPTED]}
      />
      <Parameter
        title={t("daily checked words")}
        index={parameters[ParameterType.DAILY_CHECKED]}
      />
      <Parameter
        title={t("weekly checked words")}
        index={parameters[ParameterType.WEEKLY_CHECKED]}
      />
      <Parameter
        title={t("monthly checked words")}
        index={parameters[ParameterType.MONTHLY_CHECKED]}
      />
      <Parameter
        title={t("total words in vocabulary")}
        index={
          parameters[ParameterType.TOTAL] -
          parameters[ParameterType.NEW] -
          parameters[ParameterType.REJECTED]
        }
        size={ParameterSize.LARGE}
        className={styles.withBottomMargin}
      />
      <Parameter
        title={t("rejected words")}
        index={parameters[ParameterType.REJECTED]}
      />
    </div>
  );
};

export default Statistics;
