import { lazy } from "react";

export const QuizPageAsync = lazy(async () => import("./QuizPage.tsx"));
