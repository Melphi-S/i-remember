import { FC, FormHTMLAttributes } from "react";
import styles from "./Form.module.scss";
import { Language } from "../../../config/i18nConfig";
import { getDeclension, getPluralForm } from "../../../utils/functions.ts";
import i18n, { t } from "i18next";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  secondsToUnblock?: number;
  errorRequestMessage?: string | null;
}

const Form: FC<FormProps> = (props) => {
  const {
    secondsToUnblock = 0,
    errorRequestMessage = null,
    children,
    ...rest
  } = props;

  return (
    <form className={styles.form} {...rest}>
      {children}
      {secondsToUnblock > 0 && (
        <p className={styles.blockMessage}>
          {t("code was sent")} {secondsToUnblock}{" "}
          {i18n.language === Language.RUSSIAN
            ? getDeclension(secondsToUnblock, ["секунду", "секунды", "секунд"])
            : getPluralForm(secondsToUnblock, ["second", "seconds"])}
        </p>
      )}
      <p className={styles.error}>{errorRequestMessage || ""}</p>
    </form>
  );
};

export default Form;
