import { lazy } from "react";

export const TasksPageAsync = lazy(async () => import("./TasksPage.tsx"));
