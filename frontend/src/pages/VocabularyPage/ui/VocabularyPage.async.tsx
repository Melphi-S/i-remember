import { lazy } from "react";

export const VocabularyPageAsync = lazy(
  async () => import("./VocabularyPage.tsx"),
);
