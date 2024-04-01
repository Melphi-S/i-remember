import styles from "./Navigation.module.scss";
import NavigationLink from "../ui/NavigationLink/NavigationLink.tsx";
import { RoutePath } from "../../config/routeConfig";
import { useTranslation } from "react-i18next";
import {useTasks} from "../../hooks/useTasks.ts";

const Navigation = () => {
  const { dailyTasks, weeklyTasks, monthlyTasks } = useTasks();
  const { t } = useTranslation();

  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavigationLink to={RoutePath.vocabulary_page}>
            {t("vocabulary")}
          </NavigationLink>
        </li>
        <li className={styles.item}>
          <NavigationLink to={RoutePath.daily_page} number={dailyTasks?.length}>
            {t("daily tasks")}
          </NavigationLink>
        </li>
        <li className={styles.item}>
          <NavigationLink
            to={RoutePath.weekly_page}
            number={weeklyTasks?.length}
          >
            {t("weekly tasks")}
          </NavigationLink>
        </li>
        <li className={styles.item}>
          <NavigationLink
            to={RoutePath.monthly_page}
            number={monthlyTasks?.length}
          >
            {t("monthly tasks")}
          </NavigationLink>
        </li>
        <li className={styles.item}>
          <NavigationLink to={RoutePath.quiz_page}>{t("quiz")}</NavigationLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
