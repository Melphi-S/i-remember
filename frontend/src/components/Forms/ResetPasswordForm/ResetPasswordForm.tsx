import styles from "./ResetPasswordForm.module.scss";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { validationOptions } from "../../../utils/variables.ts";
import { authAPI } from "../../../api/services/AuthService.ts";
import { useRequestError } from "../../../hooks/useRequestError.ts";
import { ErrorGroups } from "../../../api/types";
import { SubmitHandler, useForm } from "react-hook-form";
import Form from "../../ui/Form/Form.tsx";
import Input from "../../ui/Input/Input.tsx";
import InputPassword from "../../ui/InputPassword/InputPassword.tsx";
import Button from "../../ui/Button/Button.tsx";
import { useNavigate } from "react-router-dom";
import BackButton from "../../ui/BackButton/BackButton.tsx";

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
  code: string;
}

interface ForgotPasswordFormProps {
  onBack: () => void;
}

const ResetPasswordForm: FC<ForgotPasswordFormProps> = ({ onBack }) => {
  const { t } = useTranslation();

  const { password } = validationOptions;

  const [reset, { error, isLoading }] = authAPI.useResetMutation();

  const errorRequestMessage = useRequestError(ErrorGroups.WRONG_CODE, error);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ResetPasswordForm>({ mode: "onChange" });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ResetPasswordForm> = async (data) => {
    const result = await reset({ password: data.password, code: data.code });

    if (!("error" in result)) {
      navigate("/");
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      errorRequestMessage={errorRequestMessage}
    >
      <BackButton onClick={onBack} />
      <p className={styles.text}>{t("change password text")}</p>
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
      <InputPassword
        {...register("confirmPassword", {
          required: t("password again"),
          validate: (value) => value === getValues("password") || t("no match"),
        })}
        placeholder={t("confirm password")}
        hasError={Boolean(errors.confirmPassword)}
        errorMessage={
          errors.confirmPassword
            ? errors.confirmPassword.type === "required"
              ? t("password again")
              : t("no match")
            : ""
        }
        isVisible={isPasswordVisible}
        setIsVisible={setIsPasswordVisible}
      />
      <Input
        {...register("code", {
          required: t("enter code"),
        })}
        placeholder={t("reset code")}
        hasError={Boolean(errors.code)}
        errorMessage={errors.code ? t("enter code") : ""}
      />
      <Button
        disabled={isLoading}
        isLoading={isLoading}
        className={styles.button}
        type="submit"
      >
        {t("reset password")}
      </Button>
    </Form>
  );
};

export default ResetPasswordForm;
