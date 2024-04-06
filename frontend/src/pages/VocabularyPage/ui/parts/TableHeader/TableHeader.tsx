import styles from "./TableHeader.module.scss";
import { useTranslation } from "react-i18next";
import { useResize } from "../../../../../hooks/useResize.tsx";

const TableHeader = () => {
  const { t } = useTranslation();

  const { isLaptopScreen, isTabletScreen, isMobileScreen } = useResize();

  return (
    <div className={styles.header}>
      <span className={styles.leftTitleWithPadding}>{t("word title")}</span>
      {!isTabletScreen && (
        <>
          <span className={styles.leftTitle}>{t("audio title")}</span>
          <span className={styles.leftTitle}>{t("transcription title")}</span>
        </>
      )}
      <span className={styles.leftTitle}>{t("translation title")}</span>
      {!isMobileScreen && (
        <span className={styles.leftTitle}>{t("status title")}</span>
      )}
      {!isLaptopScreen && (
        <>
          <span className={styles.centerTitle}>{t("mistake title")}</span>
          <span className={styles.centerTitle}>
            {t("total mistakes title")}
          </span>
          <span className={styles.centerTitle}>{t("date title")}</span>
          <span className={styles.centerTitle}>{t("accept / reject")}</span>
        </>
      )}
    </div>
  );
};

export default TableHeader;
