import styles from "./TasksChecker.module.scss";
import { Dispatch, FC, SetStateAction, useState } from "react";
import ReactCardFlip from "react-card-flip";
import WordInfoCard from "../../../../../components/WordInfoCard/WordInfoCard.tsx";
import { WordColors } from "../../../../../components/Sticker/types";
import WordInfo from "../../../../../components/WordInfo/WordInfo.tsx";
import { WordInfoType } from "../../../../../components/WordInfo/types";
import Input from "../../../../../components/ui/Input/Input.tsx";
import { validationOptions } from "../../../../../utils/variables.ts";
import Button from "../../../../../components/ui/Button/Button.tsx";
import { wordsApi } from "../../../../../api/services/WordsService.ts";
import { VocabularyWord } from "../../../../../api/models/Vocabulary.ts";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import classnames from "classnames";
import { TaskType } from "../../../types";

interface CheckForm {
  translation: string;
}
interface TaskCheckerProps {
  tasks: VocabularyWord[];
  curTask: number;
  setCurTask: Dispatch<SetStateAction<number>>;
  type: TaskType;
}

const TasksChecker: FC<TaskCheckerProps> = ({
  tasks,
  curTask,
  setCurTask,
  type,
}) => {
  const [increase, { error: increaseError, isLoading: isIncreaseLoading }] =
    wordsApi.useIncreaseStatusMutation();
  const [decrease, { error: decreaseError, isLoading: isDecreaseLoading }] =
    wordsApi.useDecreaseStatusMutation();

  const [isFlipped, setIsFlipped] = useState(false);

  const [checkResult, setCheckResult] = useState<boolean | null>(null);

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<CheckForm>({ mode: "onChange" });

  const onSubmit: SubmitHandler<CheckForm> = async (data) => {
    const variants = data.translation.split(",").map((word) => word.trim());
    const isChecked = variants.some(
      (variant) => variant === tasks[curTask].word.en,
    );

    if (isChecked) {
      const result = await increase(tasks[curTask].id);
      if (!("error" in result)) {
        setCheckResult(true);
        setIsFlipped(true);
      }
    } else {
      const result = await decrease(tasks[curTask].id);
      if (!("error" in result)) {
        setCheckResult(false);
        setIsFlipped(true);
      }
    }
  };

  const onNext = async () => {
    setCheckResult(null);
    setIsFlipped(false);
    reset({ translation: "" });
    clearErrors();
    await new Promise((res) => setTimeout(res, 200));
    setCurTask((prev) => prev + 1);
  };

  const resultMessageClass = classnames({
    [styles.resultMessage]: true,
    [styles.resultMessage_right]: checkResult === true,
    [styles.resultMessage_wrong]: checkResult === false,
  });

  const checkWrapperClass = classnames({
    [styles.checkWrapper_right]: checkResult === true,
    [styles.checkWrapper_wrong]: checkResult === false,
  });

  const taskTime = {
    [TaskType.DAILY]: t("day"),
    [TaskType.WEEKLY]: t("week"),
    [TaskType.MONTHLY]: t("month"),
  };

  return (
    <div className={styles.wrapper}>
      {tasks[curTask] && (
        <ReactCardFlip isFlipped={isFlipped} flipDirection={"horizontal"}>
          <WordInfoCard color={WordColors.YELLOW}>
            <WordInfo word={tasks[curTask].word} type={WordInfoType.CLOSED} />
          </WordInfoCard>
          <div className={checkWrapperClass}>
            <WordInfoCard color={WordColors.YELLOW}>
              <WordInfo word={tasks[curTask].word} />
            </WordInfoCard>
          </div>
        </ReactCardFlip>
      )}
      <div className={styles.briefWrapper}>
        {!isFlipped ? (
          <p className={styles.brief}>{t("translation brief")}</p>
        ) : (
          <>
            <span className={resultMessageClass}>
              {checkResult ? t("right") : t("wrong")}
            </span>
            <p
              className={styles.brief}
            >{`${t("you receive this task again")} ${taskTime[type]}`}</p>
          </>
        )}
      </div>
      <Input
        {...register("translation", {
          required: t("enter translation"),
          pattern: {
            value: validationOptions.translation.regExp,
            message: t("incorrect translation"),
          },
        })}
        disabled={isFlipped}
        placeholder={t("translation")}
        hasError={Boolean(errors.translation)}
        errorMessage={
          errors.translation
            ? errors.translation.type === "required"
              ? t("enter translation")
              : t("incorrect translation")
            : ""
        }
      />
      {!isFlipped ? (
        <Button
          disabled={isIncreaseLoading || isDecreaseLoading}
          isLoading={isIncreaseLoading || isDecreaseLoading}
          onClick={handleSubmit(onSubmit)}
          className={styles.button}
        >
          {t("check")}
        </Button>
      ) : (
        <Button onClick={onNext} className={styles.button}>
          {t("next")}
        </Button>
      )}
      <div className={styles.errorWrapper}>
        {(increaseError || decreaseError) && (
          <span className={styles.error}>{t("unknown request error")}</span>
        )}
      </div>
    </div>
  );
};

export default TasksChecker;
