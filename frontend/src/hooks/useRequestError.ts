import { ErrorGroups } from "../api/types";
import { useTranslation } from "react-i18next";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import {ErrorMessages} from "../api/errorMessages";

export function useRequestError(
  key: ErrorGroups,
  error: FetchBaseQueryError | SerializedError | undefined,
) {
  const { t } = useTranslation();

  if (error) {
    if ("status" in error && error.status in ErrorMessages[key]) {
      return t(ErrorMessages[key][error.status]);
    }

    return t(ErrorMessages.unknown.any);
  }

  return null;
}
