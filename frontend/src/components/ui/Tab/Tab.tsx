import { ButtonHTMLAttributes, FC } from "react";
import styles from "./Tab.module.scss";
import classnames from "classnames";

interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isActive: boolean;
}

const Tab: FC<TabProps> = ({ className = "", isActive, children, ...rest }) => {
  const tabClass = classnames({
    [styles.tab]: true,
    [className]: true,
    [styles.active]: isActive,
  });

  return (
    <button className={tabClass} type="button" {...rest}>
      {children}
    </button>
  );
};

export default Tab;
