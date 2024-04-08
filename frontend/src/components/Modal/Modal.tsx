import styles from "./Modal.module.scss";
import { useEffect, FC, ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import classnames from "classnames";
import { useTheme } from "../../hooks/useTheme.ts";
import CloseButton from "../ui/CloseButton/CloseButton.tsx";

const modalsContainer = document.querySelector("#modals") as HTMLElement;

export enum ModalFor {
  POPUP = "popup",
  PROFILE = "profile",
}

interface ModalProps {
  closeModal: () => void;
  children: ReactNode;
  forType?: ModalFor;
  isCloseButton?: boolean;
}

const Modal: FC<ModalProps> = ({
  closeModal,
  forType = ModalFor.POPUP,
  isCloseButton = false,
  children,
}) => {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const handleEscKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscKeydown);

    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
    };
  }, []);

  const { theme } = useTheme();

  async function handleClose() {
    setClosing(true);
    await new Promise((res) => setTimeout(res, 200));
    closeModal();
  }

  const modalClass = classnames({
    portal: true,
    [theme]: true,
    [styles.modal]: true,
    [styles[forType]]: true,
    [styles.closeProfile]: forType === ModalFor.PROFILE && closing,
  });

  return createPortal(
    <>
      <div className={modalClass}>
        {isCloseButton && (
          <CloseButton onClick={handleClose} className={styles.closeButton} />
        )}

        {children}
      </div>
      <ModalOverlay onClick={handleClose} />
    </>,
    modalsContainer,
  );
};

export default Modal;
