import {useTranslation} from "react-i18next";
import {validationOptions} from "../../utils/variables.ts";
import {authAPI} from "../../services/AuthService.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import styles from "../LoginForm/LoginForm.module.scss";
import Input from "../ui/Input/Input.tsx";
import Button from "../ui/Button/Button.tsx";

interface RegisterForm {
    email: string,
    password: string,
    confirmPassword: string,
}

const RegisterForm = () => {
    const { t } = useTranslation();

    const { email, password } = validationOptions;


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>({ mode: "onChange" });

    const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
        console.log(data)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Input
                {...register("email", {
                    required: t('enter email'),
                    pattern: {
                        value: email.regExp,
                        message: t("incorrect email"),
                    },
                })}
                placeholder={t("email")}
                hasError={Boolean(errors.email)}
                errorMessage={errors.email?.message}
            />
            <Input
                {...register("password", {
                    required: "Введите пароль",
                    // pattern: {
                    //   value: password.regExp,
                    //   message: "Пароль не удовляетворяет условиям",
                    // },
                })}
                placeholder={t("password")}
                hasError={Boolean(errors.password)}
                errorMessage={errors.password?.message}
            />
            <Input
                {...register("confirmPassword", {
                    required: "Введите пароль",
                    // pattern: {
                    //   value: password.regExp,
                    //   message: "Пароль не удовляетворяет условиям",
                    // },
                })}
                placeholder={t("confirm password")}
                hasError={Boolean(errors.password)}
                errorMessage={errors.password?.message}
            />
            <Button className={styles.button} type="submit">{t("sign up")}</Button>
        </form>
    );
};

export default RegisterForm;