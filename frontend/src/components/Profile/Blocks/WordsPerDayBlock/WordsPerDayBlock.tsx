import styles from './WordsPerDayBlock.module.scss';
import { useState } from "react";
import { useAppSelector } from "../../../../store/store.ts";
import { FetchResult } from "../../types";
import { userApi } from "../../../../api/services/UserService.ts";
import ProfileBlock from "../../../ProfileBlock/ProfileBlock.tsx";
import RadioButton from "../../../ui/RadioButton/RadioButton.tsx";
import {useTranslation} from "react-i18next";

const values = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
];

const WordsPerDayBlock = () => {
  const { user } = useAppSelector((state) => state.user);

  const [newWordsPerDay, setWordsPerDay] = useState<string | number>(
    (user?.wordsPerDay as number) || 3,
  );

  const [fetchResult, setFetchResult] = useState<FetchResult | null>(null);

  const [patch, { isLoading }] = userApi.usePatchMutation();

  const {t} = useTranslation()

  const onSubmit = async (wordsPerDay: number | string) => {
    const result = await patch({ wordsPerDay: +wordsPerDay });

    if ("error" in result) {
      setFetchResult(FetchResult.ERROR);
      await new Promise((res) => setTimeout(res, 2000));
      setFetchResult(null);
    } else {
      setFetchResult(FetchResult.SUCCESS);
      await new Promise((res) => setTimeout(res, 2000));
      setFetchResult(null);
    }
  };

  return (
    <ProfileBlock
      title={t("change wordsPerPar")}
      onSubmit={() => onSubmit(newWordsPerDay)}
      fetchError={fetchResult === FetchResult.ERROR}
      fetchSuccess={fetchResult === FetchResult.SUCCESS}
      isLoading={isLoading}
      isPrevValue={newWordsPerDay == user?.wordsPerDay}
      onCancel={() => {
        setWordsPerDay(user?.wordsPerDay as number);
      }}
      isValid={true}
    >
      <div className={styles.wrapper}>
        {values.map((value) => (
          <RadioButton
            key={value.value}
            value={value.value.toString()}
            label={value.label.toString()}
            groupValue={newWordsPerDay.toString()}
            setGroupValue={setWordsPerDay}
          />
        ))}
      </div>
    </ProfileBlock>
  );
};

export default WordsPerDayBlock;
