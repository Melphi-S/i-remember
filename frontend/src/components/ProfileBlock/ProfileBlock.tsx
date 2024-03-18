import styles from "./ProfileBlock.module.scss";
import { Dispatch, FC, HTMLAttributes, SetStateAction } from "react";
import AccordionHeader from "../ui/AccordionHeader/AccordionHeader.tsx";
import SaveCancelButton from "../ui/SaveCancelButton/SaveCancelButton.tsx";
import Loader from "../ui/Loader/Loader.tsx";
import classnames from "classnames";
import { t } from "i18next";

interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  title: string;
  fetchError: boolean;
  fetchSuccess: boolean;
  isLoading: boolean;
  isValid: boolean;
  isPrevValue: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

const ProfileBlock: FC<AccordionProps> = (props) => {
  const {
    isOpened,
    title,
    setIsOpened,
    fetchError,
    fetchSuccess,
    isLoading,
    isValid,
    isPrevValue,
    onSubmit,
    onCancel,
    children,
  } = props;

  const controlPanelState = () => {
    if (fetchError) {
      return <span className={styles.error}>{t("unknown request error")}</span>;
    }

    if (fetchSuccess) {
      return <span className={styles.success}>{t("fetch success")}</span>;
    }

    if (isLoading) {
      return <Loader />;
    }

    return (
      <>
        <SaveCancelButton
          type="submit"
          disabled={isPrevValue || !isValid}
          onClick={onSubmit}
        >
          {t("save")}
        </SaveCancelButton>
        <SaveCancelButton
          type="button"
          disabled={isPrevValue}
          onClick={onCancel}
        >
          {t("cancel")}
        </SaveCancelButton>
      </>
    );
  };

  const controlPanelClass = classnames({
    [styles.controlPanel]: true,
    [styles.notValid]: !isValid,
  });

  return (
    <li className={styles.accordion}>
      <AccordionHeader
        isOpened={isOpened}
        onClick={() => setIsOpened((prev) => !prev)}
      >
        {title}
      </AccordionHeader>
      {isOpened && (
        <div className={styles.body}>
          {children}
          <div className={controlPanelClass}>{controlPanelState()}</div>
        </div>
      )}
    </li>
  );
};

export default ProfileBlock;
