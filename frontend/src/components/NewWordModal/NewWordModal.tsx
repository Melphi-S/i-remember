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
import { vocabularyWordsApi } from "../../api/services/VocabularyWordsService.ts";

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
  const [accept, { error: acceptError, isLoading: isAcceptLoading }] =
    vocabularyWordsApi.useAcceptWordMutation();
  const [reject, { error: rejectError, isLoading: isRejectLoading }] =
    vocabularyWordsApi.useRejectWordMutation();

  const { t } = useTranslation();

  const handleAcceptButton = async (wordId: number) => {
    const result = await accept(wordId);

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
            {isAcceptLoading ? (
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
                disabled={isAcceptLoading}
                onClick={() => handleRejectButton(wordId)}
              >
                {t("reject")}
              </YesNoButton>
            )}
          </div>
          <div className={styles.errorWrapper}>
            {(acceptError || rejectError) && (
              <span className={styles.error}>{t("unknown request error")}</span>
            )}
          </div>
        </div>
      </WordInfoCard>
    </Modal>
  );
};

export default NewWordModal;
