export enum ErrorGroups {
    EMAIL = 'email',
    UNKNOWN = 'unknown',
    WRONG_LOGIN = 'wrong_login',
    WRONG_CODE = 'wrong_code',
    ALREADY_EXIST = 'already_exist',
    WRONG_PASSWORD = 'wrong_password'
}

export enum VocabularyWordsStatuses {
    BANNED,
    NEW,
    TO_DAILY,
    IN_DAILY,
    CHECKED_DAILY,
    IN_WEEKLY,
    CHECKED_WEEKLY,
    IN_MONTHLY,
    CHECKED_MONTHLY,
}