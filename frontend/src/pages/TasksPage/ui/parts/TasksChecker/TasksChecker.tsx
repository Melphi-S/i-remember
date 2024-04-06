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
import { VocabularyWord } from "../../../../../api/models/Vocabulary.ts";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import classnames from "classnames";
import { TaskType } from "../../../types";
import Form from "../../../../../components/ui/Form/Form.tsx";
import { VocabularyWordsStatuses } from "../../../../../api/types";
import { vocabularyWordsApi } from "../../../../../api/services/VocabularyWordsService.ts";

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
    vocabularyWordsApi.useIncreaseStatusMutation();
  const [decrease, { error: decreaseError, isLoading: isDecreaseLoading }] =
    vocabularyWordsApi.useDecreaseStatusMutation();

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
      const getStep = () => {
        if (tasks[curTask].status === VocabularyWordsStatuses.IN_MONTHLY) {
          return 4;
        }
        if (tasks[curTask].status === VocabularyWordsStatuses.IN_WEEKLY) {
          return 2;
        }

        return 1;
      };
      const result = await decrease({ id: tasks[curTask].id, step: getStep() });
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

  const getBriefMessage = () => {
    if (checkResult) {
      if (type === TaskType.DAILY) {
        return t("you receive this word in weekly");
      }
      if (type === TaskType.WEEKLY) {
        return t("you receive this word in monthly");
      }
      if (type === TaskType.MONTHLY) {
        return t("congratulation");
      }
    } else {
      return t("you receive this task again");
    }
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
            <p className={styles.brief}>{getBriefMessage()}</p>
          </>
        )}
      </div>
      <Form
        onSubmit={!isFlipped ? handleSubmit(onSubmit) : handleSubmit(onNext)}
        errorRequestMessage={
          increaseError || decreaseError ? t("unknown request error") : ""
        }
      >
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
            className={styles.button}
            type="submit"
          >
            {t("check")}
          </Button>
        ) : (
          <Button className={styles.button} type="submit">
            {t("next")}
          </Button>
        )}
      </Form>
    </div>
  );
};

export default TasksChecker;
