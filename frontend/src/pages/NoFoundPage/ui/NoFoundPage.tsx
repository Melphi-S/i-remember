import styles from "./NoFoundPage.module.scss";
import book from "../../../assets/images/book.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button/Button.tsx";

const NoFoundPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <span className={styles.code}>404</span>
        <p className={styles.text}>{t("no such page")}</p>
        <Button
          className={styles.button}
          onClick={() => navigate("/", { replace: true })}
        >
          {t("to the main page")}
        </Button>
      </div>
      <img className={styles.image} src={book} alt="Книга." />
    </div>
  );
};

export default NoFoundPage;
