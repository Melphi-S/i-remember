import { RouteProps } from "react-router-dom";
import { AppRoutes } from "./types.ts";
import { MainPage } from "../../pages/Main";
import { LoginPage } from "../../pages/Login";
import TasksPage from "../../pages/TasksPage/ui/TasksPage.tsx";
import { TaskType } from "../../pages/TasksPage/types";
import { VocabularyPage } from "../../pages/VocabularyPage";
import QuizPage from "../../pages/QuizPage/QuizPage.tsx";

type ProtectedRouteProps = {
  onlyForAuth: boolean;
} & RouteProps;

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN_PAGE]: "/",
  [AppRoutes.LOGIN_PAGE]: "/login",
  [AppRoutes.QUIZ]: "/quiz",
  [AppRoutes.DAILY]: "/daily",
  [AppRoutes.WEEKLY]: "/weekly",
  [AppRoutes.MONTHLY]: "/monthly",
  [AppRoutes.VOCABULARY]: "/vocabulary",
};

export const routeConfig: Record<AppRoutes, ProtectedRouteProps> = {
  [AppRoutes.MAIN_PAGE]: {
    path: RoutePath.main_page,
    element: <MainPage />,
    onlyForAuth: true,
  },
  [AppRoutes.LOGIN_PAGE]: {
    path: RoutePath.login_page,
    element: <LoginPage />,
    onlyForAuth: false,
  },
  [AppRoutes.QUIZ]: {
    path: RoutePath.quiz_page,
    element: <QuizPage />,
    onlyForAuth: true,
  },
  [AppRoutes.DAILY]: {
    path: RoutePath.daily_page,
    element: <TasksPage key={1} type={TaskType.DAILY} />,
    onlyForAuth: true,
  },
  [AppRoutes.WEEKLY]: {
    path: RoutePath.weekly_page,
    element: <TasksPage key={2} type={TaskType.WEEKLY} />,
    onlyForAuth: true,
  },
  [AppRoutes.MONTHLY]: {
    path: RoutePath.monthly_page,
    element: <TasksPage key={3} type={TaskType.MONTHLY} />,
    onlyForAuth: true,
  },
  [AppRoutes.VOCABULARY]: {
    path: RoutePath.vocabulary_page,
    element: <VocabularyPage />,
    onlyForAuth: true,
  },
};
