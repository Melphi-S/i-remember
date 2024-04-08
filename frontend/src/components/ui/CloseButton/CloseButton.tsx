import styles from "./CloseButton.module.scss";
import { ButtonHTMLAttributes, FC } from "react";
import Close from "../../../assets/icons/close.svg?react";
import classnames from "classnames";

interface ClassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const CloseButton: FC<ClassButtonProps> = ({ className = "", ...rest }) => {
  const buttonClass = classnames({
    [styles.button]: true,
    [className]: true,
  });

  return (
    <button className={buttonClass} type="button" {...rest}>
      <Close className={styles.icon}/>
    </button>
  );
};

export default CloseButton;
