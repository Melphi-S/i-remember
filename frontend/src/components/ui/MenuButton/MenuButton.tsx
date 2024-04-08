import styles from "./MenuButton.module.scss";
import { ButtonHTMLAttributes, FC } from "react";
import classnames from "classnames";

interface MenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isChecked: boolean;
}

const MenuButton: FC<MenuButtonProps> = ({ isChecked, ...rest }) => {
  const buttonClass = classnames({
    [styles.menuButton]: true,
    [styles.checked]: isChecked,
  });

  return (
    <button id='menu-button' type="button" className={styles.container} {...rest}>
      <span id='menu-button' className={buttonClass}></span>
    </button>
  );
};

export default MenuButton;
