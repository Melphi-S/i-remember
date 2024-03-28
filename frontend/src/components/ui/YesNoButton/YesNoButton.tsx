import styles from "./YesNoButton.module.scss";
import { ButtonHTMLAttributes, FC } from "react";
import classnames from "classnames";
import { YesNoButtons, YesNoSize } from "./types";

interface YesNoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: YesNoButtons;
  size?: YesNoSize;
}

const YesNoButton: FC<YesNoButtonProps> = ({
  buttonType,
  size = YesNoSize.SMALL,
  disabled,
  children,
  ...rest
}) => {
  const buttonClass = classnames({
    [styles.button]: true,
    [styles.disabled]: disabled,
    [styles[buttonType]]: true,
    [styles[size]]: true,
  });

  return (
    <button className={buttonClass} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default YesNoButton;
