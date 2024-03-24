import styles from "./ProfileBlock.module.scss";
import { BaseSyntheticEvent, FC, HTMLAttributes, useState } from "react";
import AccordionHeader from "../ui/AccordionHeader/AccordionHeader.tsx";
import SaveCancelButton from "../ui/SaveCancelButton/SaveCancelButton.tsx";
import Loader from "../ui/Loader/Loader.tsx";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  fetchError: boolean;
  fetchErrorMessage?: string;
  fetchSuccess: boolean;
  isLoading: boolean;
  isValid: boolean;
  isPrevValue: boolean;
  onSubmit: (e: BaseSyntheticEvent) => Promise<void>;
  onCancel: () => void;
}

const ProfileBlock: FC<AccordionProps> = (props) => {
  const {
    title,
    fetchError,
    fetchErrorMessage = "",
    fetchSuccess,
    isLoading,
    isValid,
    isPrevValue,
    onSubmit,
    onCancel,
    children,
  } = props;

  const [isOpened, setIsOpened] = useState(false);

  const { t } = useTranslation();

  const controlPanelState = () => {
    if (fetchError) {
      return (
        <span className={styles.error}>
          {fetchErrorMessage ? fetchErrorMessage : t("unknown request error")}
        </span>
      );
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
    <li className={styles.block}>
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
