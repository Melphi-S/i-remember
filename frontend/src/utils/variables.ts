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