import styles from "./LoginForm.module.scss";
import { useTranslation } from "react-i18next";
import Input from "../ui/Input/Input.tsx";
import Button from "../ui/Button/Button.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { validationOptions } from "../../utils/variables.ts";
import {authAPI} from "../../services/AuthService.ts";

interface LoginForm {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { t } = useTranslation();

  const { email, password } = validationOptions;

  const [signin] = authAPI.useSigninMutation()


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onChange" });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const res = await signin(data)

    console.log(res)
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
      <Button className={styles.button} type="submit">{t("sign in")}</Button>
    </form>
  );
};

export default LoginForm;
