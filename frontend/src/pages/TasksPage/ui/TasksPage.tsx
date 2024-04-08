import styles from "./TasksPage.module.scss";
import { FC, useMemo, useState } from "react";
import { TaskType } from "../types";
import { useTasks } from "../../../hooks/useTasks.ts";
import { VocabularyWord } from "../../../api/models/Vocabulary.ts";
import TasksChecker from "./parts/TasksChecker/TasksChecker.tsx";
import NoTaskMessage from "./parts/NoTaskMessage/NoTaskMessage.tsx";

interface TaskPageProps {
  type: TaskType;
}
const TasksPage: FC<TaskPageProps> = ({ type }) => {
  const { dailyTasks, weeklyTasks, monthlyTasks } = useTasks();

  const tasks = {
    [TaskType.DAILY]: dailyTasks,
    [TaskType.WEEKLY]: weeklyTasks,
    [TaskType.MONTHLY]: monthlyTasks,
  };

  const pageTasks = useMemo(
    () =>
      tasks[type] ? [...(tasks[type] as Array<VocabularyWord>)].reverse() : [],
    [],
  );

  const [curTask, setCurTask] = useState(0);

  return (
    <main className={styles.page}>
      {pageTasks[curTask] ? (
        <TasksChecker
          tasks={pageTasks}
          curTask={curTask}
          setCurTask={setCurTask}
          type={type}
        />
      ) : (
        <NoTaskMessage type={type} />
      )}
    </main>
  );
};

export default TasksPage;
