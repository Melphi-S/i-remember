import styles from "./Modal.module.scss";
import {useEffect, FC, ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import classnames from "classnames";
import { useTheme } from "../../hooks/useTheme.ts";

const modalsContainer = document.querySelector("#modals") as HTMLElement;

export enum ModalFor {
  POPUP = "popup",
  PROFILE = "profile",
}

interface ModalProps {
  closeModal: () => void;
  children: ReactNode;
  forType?: ModalFor;
}

const Modal: FC<ModalProps> = ({
  closeModal,
  forType = ModalFor.POPUP,
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
        <div className={modalClass}>{children}</div>
        <ModalOverlay onClick={handleClose} />
      </>,
    modalsContainer,
  );
};

export default Modal;
