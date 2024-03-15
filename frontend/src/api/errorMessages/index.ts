import {ErrorGroups} from "../types";

interface CodeValue {
    [code: string]: string
}

export const ErrorMessages: Record<ErrorGroups, CodeValue> = {
    [ErrorGroups.EMAIL]: {
        404: "email not found",
    },
    [ErrorGroups.UNKNOWN]: {
        any: "unknown request error"
    },
    [ErrorGroups.WRONG_LOGIN]: {
        404: 'wrong email or password',
        401: 'wrong email or password'
    },
    [ErrorGroups.WRONG_CODE]: {
        400: 'wrong code'
    },
    [ErrorGroups.ALREADY_EXIST]: {
        400: 'already exist'
    }
}