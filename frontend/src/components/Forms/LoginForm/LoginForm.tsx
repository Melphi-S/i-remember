import styles from "./LoginForm.module.scss";
import { useTranslation } from "react-i18next";
import Input from "../../ui/Input/Input.tsx";
import Button from "../../ui/Button/Button.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { validationOptions } from "../../../utils/variables.ts";
import { authAPI } from "../../../api/services/AuthService.ts";
import { FC, useState } from "react";
import Form from "../../ui/Form/Form.tsx";
import { useRequestError } from "../../../hooks/useRequestError.ts";
import { ErrorGroups } from "../../../api/types";
import InputPassword from "../../ui/InputPassword/InputPassword.tsx";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginFormProps {
  onResetRequest: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ onResetRequest }) => {
  const { t } = useTranslation();

  const { email, password } = validationOptions;

  const [signin, { error, isLoading }] = authAPI.useSigninMutation();

  const errorRequestMessage = useRequestError(ErrorGroups.WRONG_LOGIN, error);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onChange" });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const result = await signin(data);

    if (!("error" in result)) {
      navigate("/");
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      errorRequestMessage={errorRequestMessage}
    >
      <Input
        {...register("email", {
          required: t("enter email"), //don't work with translation, set message in errorMessage prop below
          pattern: {
            value: email.regExp,
            message: t("incorrect email"), //don't work with translation, set message in errorMessage prop below
          },
        })}
        placeholder={t("email")}
        hasError={Boolean(errors.email)}
        errorMessage={
          errors.email
            ? errors.email.type === "required"
              ? t("enter email")
              : t("incorrect email")
            : ""
        }
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
        errorMessage={
          errors.password
            ? errors.password.type === "required"
              ? t("enter password")
              : t("incorrect password")
            : ""
        }
        isVisible={isPasswordVisible}
        setIsVisible={setIsPasswordVisible}
      />
      <button onClick={onResetRequest} type="button" className={styles.forgot}>
        {t("forgot password?")}
      </button>
      <Button
        disabled={isLoading}
        isLoading={isLoading}
        className={styles.button}
        type="submit"
      >
        {t("sign in")}
      </Button>
    </Form>
  );
};

export default LoginForm;
