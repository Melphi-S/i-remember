import styles from './TaskBoardPanel.module.scss';
import {useTasks} from "../../hooks/useTasks.ts";
import {useTranslation} from "react-i18next";
import TaskBoard from "../TaskBoard/TaskBoard.tsx";
import {RoutePath} from "../../config/routeConfig";
import {Language} from "../../config/i18nConfig";
import {getDeclension, getPluralForm} from "../../utils/functions.ts";

const TaskBoardPanel = () => {
    const { dailyTasks, weeklyTasks, monthlyTasks } = useTasks();

    const { i18n } = useTranslation();

    return (
        <div className={styles.panel}>
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
        </div>
    );
};

export default TaskBoardPanel;