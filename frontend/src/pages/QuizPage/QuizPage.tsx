import styles from './QuizPage.module.scss';
import {useTranslation} from "react-i18next";

const QuizPage = () => {
    const {t} =useTranslation();

    return (
        <main className={styles.page}>
            <p className={styles.text}>{t('in development')}</p>
        </main>
    );
};

export default QuizPage;