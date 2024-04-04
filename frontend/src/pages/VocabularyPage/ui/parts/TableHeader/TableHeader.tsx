import styles from './TableHeader.module.scss';
import {useTranslation} from "react-i18next";

const TableHeader = () => {
    const {t} = useTranslation();

    return (
        <div className={styles.header}>
            <span className={styles.leftTitleWithPadding}>{t("word title")}</span>
            <span className={styles.leftTitle}>{t("audio title")}</span>
            <span className={styles.leftTitle}>{t("transcription title")}</span>
            <span className={styles.leftTitle}>{t("translation title")}</span>
            <span className={styles.leftTitle}>{t("status title")}</span>
            <span className={styles.centerTitle}>{t("mistake title")}</span>
            <span className={styles.centerTitle}>{t("total mistakes title")}</span>
            <span className={styles.centerTitle}>{t("date title")}</span>
        </div>
    );
};

export default TableHeader;