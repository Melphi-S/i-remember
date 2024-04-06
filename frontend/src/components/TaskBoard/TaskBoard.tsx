import styles from "./TaskBoard.module.scss";
import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useResize } from "../../hooks/useResize.tsx";

interface TaskBoardProps extends LinkProps {
  number: number;
}

const TaskBoard: FC<TaskBoardProps> = ({ to, number, children }) => {
  const { t } = useTranslation();

  const { isMobileScreen } = useResize();

  return (
    <Link to={to} className={styles.board}>
      {!isMobileScreen && <p className={styles.text}>{t("you have")}</p>}
      <span className={styles.number}>{number ? number : t("no")}</span>
      {children}
    </Link>
  );
};

export default TaskBoard;
