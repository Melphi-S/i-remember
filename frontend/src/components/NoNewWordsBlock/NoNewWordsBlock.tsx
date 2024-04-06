import styles from "./NoNewWordsBlock.module.scss";
import { useAppSelector } from "../../store/store.ts";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button/Button.tsx";
import { vocabularyApi } from "../../api/services/VocabularyService.ts";

const NoNewWordsBlock = () => {
  const { vocabulary } = useAppSelector((state) => state.vocabulary);
  const { user } = useAppSelector((state) => state.user);

  const { t } = useTranslation();

  const [getFirstWords, { error, isLoading }] =
    vocabularyApi.useGetFirstWordsMutation();

  const handleButton = async () => {
    await getFirstWords();
  };

  if (!vocabulary) {
    return <></>;
  }

  return (
    <div className={styles.block}>
      {vocabulary.vocabularyWords.length ? (
        <>
          <p className={styles.text}>{t("no new words")}</p>
          <p className={styles.text}>{t("new words every morning")}</p>
          <p className={styles.text}>{t("you will receive tasks tomorrow")}</p>
        </>
      ) : (
        <>
          <p className={styles.text}>{`${t("welcome")} ${user?.username}!`}</p>
          <p className={styles.text}>{t("press button for first words")}</p>
          <Button
            onClick={handleButton}
            disabled={isLoading}
            isLoading={isLoading}
            className={styles.button}
          >
            {t("PRESS")}
          </Button>
          <p className={styles.textSmall}>{t("number of words by default")}</p>
          <p className={styles.textSmall}>{t("by the way")}</p>
          <div className={styles.errorWrapper}>
            {error && (
              <span className={styles.error}>{t("unknown request error")}</span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NoNewWordsBlock;
