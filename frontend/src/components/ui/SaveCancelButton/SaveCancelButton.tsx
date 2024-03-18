import styles from "./SaveCancelButton.module.scss";
import { ButtonHTMLAttributes, FC } from "react";
import classnames from "classnames";

const SaveCancelButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  disabled,
  children,
  ...rest
}) => {
  const buttonClass = classnames({
    [styles.button]: true,
    [styles.disabled]: disabled,
  });

  return (
    <button className={buttonClass} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default SaveCancelButton;
