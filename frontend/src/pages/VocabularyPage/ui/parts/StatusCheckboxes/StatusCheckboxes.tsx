import styles from "./StatusCheckboxes.module.scss";
import { StatusToDisplay } from "../../../../../components/VocabularyItem/types";
import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import Checkbox from "../../../../../components/ui/Checkbox/Checkbox.tsx";

export interface Checkboxes {
  [StatusToDisplay.NEW]: boolean;
  [StatusToDisplay.CHECKED_DAILY]: boolean;
  [StatusToDisplay.CHECKED_WEEKLY]: boolean;
  [StatusToDisplay.CHECKED_MONTHLY]: boolean;
  [StatusToDisplay.BANNED]: boolean;
}

interface StatusCheckboxesProps {
  checkboxes: Checkboxes;
  setCheckboxes: Dispatch<SetStateAction<Checkboxes>>;
}

const StatusCheckboxes: FC<StatusCheckboxesProps> = ({
  checkboxes,
  setCheckboxes,
}) => {
  const handleChange = (status: StatusToDisplay) => {
    setCheckboxes({
      ...checkboxes,
      [status]: !checkboxes[status],
    });
  };

  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>Показать статусы:</span>
      <div className={styles.checkboxes}>
        <Checkbox
          label={t("new")}
          checked={checkboxes[StatusToDisplay.NEW]}
          onChange={() => handleChange(StatusToDisplay.NEW)}
        />
        <Checkbox
          label={t("checkedDaily")}
          checked={checkboxes[StatusToDisplay.CHECKED_DAILY]}
          onChange={() => handleChange(StatusToDisplay.CHECKED_DAILY)}
        />
        <Checkbox
          label={t("checkedWeekly")}
          checked={checkboxes[StatusToDisplay.CHECKED_WEEKLY]}
          onChange={() => handleChange(StatusToDisplay.CHECKED_WEEKLY)}
        />
        <Checkbox
          label={t("checkedMonthly")}
          checked={checkboxes[StatusToDisplay.CHECKED_MONTHLY]}
          onChange={() => handleChange(StatusToDisplay.CHECKED_MONTHLY)}
        />
        <Checkbox
          label={t("banned")}
          checked={checkboxes[StatusToDisplay.BANNED]}
          onChange={() => handleChange(StatusToDisplay.BANNED)}
        />
      </div>
    </div>
  );
};

export default StatusCheckboxes;
