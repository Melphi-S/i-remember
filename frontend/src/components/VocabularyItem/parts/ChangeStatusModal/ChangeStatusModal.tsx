import styles from "./ChangeStatusModal.module.scss";
import { FC } from "react";
import Modal from "../../../Modal/Modal.tsx";
import { VocabularyWord } from "../../../../api/models/Vocabulary.ts";
import { VocabularyWordsStatuses } from "../../../../api/types";
import { useTranslation } from "react-i18next";
import YesNoButton from "../../../ui/YesNoButton/YesNoButton.tsx";
import { YesNoButtons, YesNoSize } from "../../../ui/YesNoButton/types";
import Spinner from "../../../ui/Spinner/Spinner.tsx";
import { vocabularyWordsApi } from "../../../../api/services/VocabularyWordsService.ts";

interface ChangeStatusModalProps {
  closeModal: () => void;
  word: VocabularyWord;
}

const ChangeStatusModal: FC<ChangeStatusModalProps> = ({
  closeModal,
  word,
}) => {
  const { t } = useTranslation();

  const [accept, { error: acceptError, isLoading: isAcceptLoading }] =
    vocabularyWordsApi.useAcceptWordMutation();
  const [reject, { error: rejectError, isLoading: isRejectLoading }] =
    vocabularyWordsApi.useRejectWordMutation();

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
      {word.status === VocabularyWordsStatuses.BANNED ? (
        <div className={styles.wrapper}>
          <p className={styles.text}>{t("change status warning accept")}</p>
          <p className={styles.text}>{t("are you sure?")}</p>
          {isAcceptLoading ? (
            <Spinner />
          ) : (
            <div className={styles.buttonContainer}>
              <YesNoButton
                size={YesNoSize.LARGE}
                buttonType={YesNoButtons.YES}
                onClick={() => handleAcceptButton(word.id)}
              >
                {t("confirm")}
              </YesNoButton>
              <YesNoButton
                size={YesNoSize.LARGE}
                buttonType={YesNoButtons.NO}
                onClick={closeModal}
              >
                {t("cancel")}
              </YesNoButton>
            </div>
          )}
          <div className={styles.errorWrapper}>
            {acceptError && (
              <span className={styles.error}>{t("unknown request error")}</span>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <p className={styles.text}>{t("change status warning reject")}</p>{" "}
          <p className={styles.text}>{t("are you sure?")}</p>
          {isRejectLoading ? (
            <Spinner />
          ) : (
            <div className={styles.buttonContainer}>
              <YesNoButton
                size={YesNoSize.LARGE}
                buttonType={YesNoButtons.YES}
                onClick={() => handleRejectButton(word.id)}
              >
                {t("confirm")}
              </YesNoButton>
              <YesNoButton
                size={YesNoSize.LARGE}
                buttonType={YesNoButtons.NO}
                onClick={closeModal}
              >
                {t("cancel")}
              </YesNoButton>
            </div>
          )}
          <div className={styles.errorWrapper}>
            {rejectError && (
              <span className={styles.error}>{t("unknown request error")}</span>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ChangeStatusModal;
