import styles from "./MainPage.module.scss";
import Block from "../../../components/Block/Block.tsx";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import WordsSwiper from "../../../components/WordsSwiper/WordsSwiper.tsx";
import TaskBoard from "../../../components/TaskBoard/TaskBoard.tsx";
import { useTranslation } from "react-i18next";
import { Language } from "../../../config/i18nConfig";
import { getDeclension, getPluralForm } from "../../../utils/functions.ts";
import {RoutePath} from "../../../config/routeConfig";
import {useTasks} from "../../../hooks/useTasks.ts";

const MainPage = () => {
  const { dailyTasks, weeklyTasks, monthlyTasks } = useTasks();

  const { i18n } = useTranslation();


  return (
    <main className={styles.main}>
      <Block className={styles.new}>
        <WordsSwiper />
      </Block>
      <Block className={styles.daylies}>
        {dailyTasks && (
          <TaskBoard to={RoutePath.daily_page} number={dailyTasks.length}>
            {i18n.language === Language.RUSSIAN
              ? getDeclension(dailyTasks.length, [
                  "ежедневное задание",
                  "ежедневных задания",
                  "ежедневных заданий",
                ])
              : getPluralForm(dailyTasks.length, ["daily task", "daily tasks"])}
          </TaskBoard>
        )}
        {weeklyTasks && (
          <TaskBoard to={RoutePath.weekly_page} number={weeklyTasks.length}>
            {i18n.language === Language.RUSSIAN
              ? getDeclension(weeklyTasks.length, [
                  "еженедельное задание",
                  "еженедельных задания",
                  "еженедельных заданий",
                ])
              : getPluralForm(weeklyTasks.length, [
                  "weekly task",
                  "weekly tasks",
                ])}
          </TaskBoard>
        )}
        {monthlyTasks && (
          <TaskBoard to={RoutePath.monthly_page} number={monthlyTasks.length}>
            {i18n.language === Language.RUSSIAN
              ? getDeclension(monthlyTasks.length, [
                  "ежемесячное задание",
                  "ежемесячных задания",
                  "ежемесячных заданий",
                ])
              : getPluralForm(monthlyTasks.length, [
                  "monthly task",
                  "monthly tasks",
                ])}
          </TaskBoard>
        )}
      </Block>
      <Block className={styles.stats} />
    </main>
  );
};

export default MainPage;
