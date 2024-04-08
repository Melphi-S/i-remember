export const validationOptions = {
    email: {
        regExp: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
    },
    password: {
        regExp: /^(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*\d)(?=.*[@#$%^&-+=()!? "]).{8,128}$/
    },
    translation: {
        regExp: /^[a-zA-Z,\s]+$/,
    }
}

export const oneYear = 31536000000;

export const API_URL = import.meta.env.VITE_API_URL;

export const AVATAR_URL = import.meta.env.VITE_AVATAR_URL;

export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL;

export const CONTACT_TELEGRAM = import.meta.env.VITE_CONTACT_TELEGRAM;

export const CONTACT_GITHUB = import.meta.env.VITE_CONTACT_GITHUB;
