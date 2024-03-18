export interface User {
    id: string;
    username: string;
    email: string;
    avatar: string;
    wordsPerDay: number;
}

export interface UserSignin {
    email: string,
    password: string
}

export interface UserSignup {
    username: string,
    email: string,
    password: string
}

export interface PasswordReset {
    password: string,
    code: string
}
