import styles from "./ErrorPage.module.scss";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button/Button.tsx";
import {useNavigate} from "react-router-dom";
import ContactLink from "../ContactLink/ContactLink.tsx";
import {ContactLinkSize, ContactLinkType} from "../ContactLink/types";

const ErrorPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <p className={styles.text}>{t("unexpected error")}</p>
      <Button className={styles.button} onClick={() => navigate(0)}>{t("reload page")}</Button>
      <p className={styles.text}>{t("if the error is repeated")}</p>
      <div className={styles.contactsWrapper}>
          <ContactLink
              type={ContactLinkType.TELEGRAM}
              size={ContactLinkSize.LARGE}
          />
          <ContactLink
              type={ContactLinkType.EMAIL}
              size={ContactLinkSize.LARGE}
              withColor={true}
          />
      </div>
    </main>
  );
};

export default ErrorPage;
