import styles from "./NewWordModal.module.scss";
import Modal from "../Modal/Modal.tsx";
import { FC } from "react";
import { Word } from "../../api/models/Vocabulary.ts";
import { WordColors } from "../Sticker/types";
import Spinner from "../ui/Spinner/Spinner.tsx";
import YesNoButton from "../ui/YesNoButton/YesNoButton.tsx";
import { YesNoButtons, YesNoSize } from "../ui/YesNoButton/types";
import { useTranslation } from "react-i18next";
import WordInfoCard from "../WordInfoCard/WordInfoCard.tsx";
import WordInfo from "../WordInfo/WordInfo.tsx";
import { vocabularyApi } from "../../api/services/VocabularyService.ts";

interface NewWordModalProps {
  closeModal: () => void;
  word: Word;
  wordId: number;
  color: WordColors;
}

const NewWordModal: FC<NewWordModalProps> = ({
  closeModal,
  word,
  wordId,
  color,
}) => {
  const [increase, { error: increaseError, isLoading: isIncreaseLoading }] =
    vocabularyApi.useIncreaseStatusMutation();
  const [reject, { error: rejectError, isLoading: isRejectLoading }] =
    vocabularyApi.useRejectWordMutation();

  const { t } = useTranslation();

  const handleAcceptButton = async (wordId: number) => {
    const result = await increase(wordId);

    if (!("error" in result)) {
      closeModal();
    }
  };

  const handleRejectButton = async (wordId: number) => {
    const result = await reject(wordId);

    if (!("error" in result)) {
      closeModal();
    }
  };

  return (
    <Modal closeModal={closeModal}>
      <WordInfoCard color={color}>
        <WordInfo word={word} />
        <div className={styles.footer}>
          <div className={styles.buttonContainer}>
            {isIncreaseLoading ? (
              <Spinner />
            ) : (
              <YesNoButton
                buttonType={YesNoButtons.YES}
                size={YesNoSize.LARGE}
                disabled={isRejectLoading}
                onClick={() => handleAcceptButton(wordId)}
              >
                {t("accept")}
              </YesNoButton>
            )}
            {isRejectLoading ? (
              <Spinner />
            ) : (
              <YesNoButton
                buttonType={YesNoButtons.NO}
                size={YesNoSize.LARGE}
                disabled={isIncreaseLoading}
                onClick={() => handleRejectButton(wordId)}
              >
                {t("reject")}
              </YesNoButton>
            )}
          </div>
          <div className={styles.errorWrapper}>
            {(increaseError || rejectError) && (
              <span className={styles.error}>{t("unknown request error")}</span>
            )}
          </div>
        </div>
      </WordInfoCard>
    </Modal>
  );
};

export default NewWordModal;
