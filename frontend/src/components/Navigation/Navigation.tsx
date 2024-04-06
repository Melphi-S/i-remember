import styles from "./Navigation.module.scss";
import NavigationLink from "../ui/NavigationLink/NavigationLink.tsx";
import { RoutePath } from "../../config/routeConfig";
import { useTranslation } from "react-i18next";
import { useTasks } from "../../hooks/useTasks.ts";
import { FC } from "react";
import { useResize } from "../../hooks/useResize.tsx";

interface NavigationProps {
  handleClose?: () => void;
}

const Navigation: FC<NavigationProps> = ({ handleClose = () => {} }) => {
  const { dailyTasks, weeklyTasks, monthlyTasks } = useTasks();
  const { t } = useTranslation();

  const { isLaptopScreen } = useResize();

  return (
    <nav>
      <ul className={styles.list}>
        <li className={`${styles.item} ${styles.leftAside}`}>
          <NavigationLink onClick={handleClose} to={RoutePath.vocabulary_page}>
            {t("vocabulary")}
          </NavigationLink>
        </li>
        <li className={styles.item}>
          <NavigationLink
            onClick={handleClose}
            to={RoutePath.daily_page}
            number={dailyTasks?.length}
          >
            {t("daily tasks")}
          </NavigationLink>
        </li>
        <li className={styles.item}>
          <NavigationLink
            onClick={handleClose}
            to={RoutePath.weekly_page}
            number={weeklyTasks?.length}
          >
            {t("weekly tasks")}
          </NavigationLink>
        </li>
        <li className={styles.item}>
          <NavigationLink
            onClick={handleClose}
            to={RoutePath.monthly_page}
            number={monthlyTasks?.length}
          >
            {t("monthly tasks")}
          </NavigationLink>
        </li>
        <li className={`${styles.item} ${styles.rightAside}`}>
          <NavigationLink onClick={handleClose} to={RoutePath.quiz_page}>
            {t("quiz")}
          </NavigationLink>
        </li>
        {isLaptopScreen && (
          <li className={`${styles.item} ${styles.rightAside}`}>
            <NavigationLink onClick={handleClose} to={RoutePath.statistics_page}>
              {t("statistics")}
            </NavigationLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
