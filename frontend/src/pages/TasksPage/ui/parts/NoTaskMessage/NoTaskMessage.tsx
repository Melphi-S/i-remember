import styles from "./NoTaskMessage.module.scss";
import { useTranslation } from "react-i18next";
import { TaskType } from "../../../types";
import { FC } from "react";

interface NoTaskMessageProps {
  type: TaskType;
}

const NoTaskMessage: FC<NoTaskMessageProps> = ({ type }) => {
  const { t } = useTranslation();

  const taskType = {
    [TaskType.DAILY]: t("daily"),
    [TaskType.WEEKLY]: t("weekly"),
    [TaskType.MONTHLY]: t("monthly"),
  };

  const schedule = {
    [TaskType.DAILY]: t("daily schedule"),
    [TaskType.WEEKLY]: t("weekly schedule"),
    [TaskType.MONTHLY]: t("monthly schedule"),
  };

  return (
    <>
      <p
        className={styles.message}
      >{`${t("you have no")} ${taskType[type]} ${t("tasks")}`}</p>
      <p className={styles.message}>{schedule[type]}</p>
    </>
  );
};

export default NoTaskMessage;
