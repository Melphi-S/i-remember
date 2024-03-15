import styles from './RegisterForm.module.scss';
import { useTranslation } from "react-i18next";
import { validationOptions } from "../../../utils/variables.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../ui/Input/Input.tsx";
import Button from "../../ui/Button/Button.tsx";
import { FC, useState } from "react";
import InputPassword from "../../ui/InputPassword/InputPassword.tsx";
import { authAPI } from "../../../api/services/AuthService.ts";
import { useRequestError } from "../../../hooks/useRequestError.ts";
import { ErrorGroups } from "../../../api/types";
import Form from "../../ui/Form/Form.tsx";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormProps {
  onForward: () => void;
}

const RegisterForm: FC<RegisterFormProps> = ({ onForward }) => {
  const { t } = useTranslation();

  const { email, password } = validationOptions;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [signup, { error, isLoading }] = authAPI.useSignupMutation();

  const errorRequestMessage = useRequestError(ErrorGroups.ALREADY_EXIST, error);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterForm>({ mode: "onChange" });

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    const result = signup(data);

    if (!("error" in result)) {
      onForward();
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      errorRequestMessage={errorRequestMessage}
    >
      <Input
        {...register("username", {
          required: t("enter username"),
          minLength: {
            value: 2,
            message: t('username length')
          },
          maxLength: {
            value: 15,
            message: t('username length')
          },
        })}
        placeholder={t("username")}
        hasError={Boolean(errors.username)}
        errorMessage={errors.username?.message}
      />
      <Input
        {...register("email", {
          required: t("enter email"),
          pattern: {
            value: email.regExp,
            message: t("incorrect email"),
          },
        })}
        placeholder={t("email")}
        hasError={Boolean(errors.email)}
        errorMessage={errors.email?.message}
      />
      <InputPassword
          {...register("password", {
            required: t("enter password"),
            pattern: {
              value: password.regExp,
              message: t("incorrect password"),
            },
          })}
          placeholder={t("password")}
          hasError={Boolean(errors.password)}
          errorMessage={errors.password?.message}
          isVisible={isPasswordVisible}
          setIsVisible={setIsPasswordVisible}
      />
      <InputPassword
          {...register("confirmPassword", {
            required: t('password again'),
            validate: (value) =>
                value === getValues("password") || t('no match'),
          })}
          placeholder={t("confirm password")}
          hasError={Boolean(errors.confirmPassword)}
          errorMessage={errors.confirmPassword?.message}
          isVisible={isPasswordVisible}
          setIsVisible={setIsPasswordVisible}
      />
      <button onClick={onForward} type="button" className={styles.already}>
        {t("already have confirmation code")}
      </button>
      <Button
        disabled={isLoading}
        isLoading={isLoading}
        className={styles.button}
        type="submit"
      >
        {t("sign up")}
      </Button>
    </Form>
  );
};

export default RegisterForm;
