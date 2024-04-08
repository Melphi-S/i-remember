/// <reference types="vite-plugin-svgr/client" />
import { useTranslation } from "react-i18next";
import { validationOptions } from "../../../utils/variables.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./ForgotPasswordForm.module.scss";
import Input from "../../ui/Input/Input.tsx";
import Button from "../../ui/Button/Button.tsx";
import { FC, useEffect, useState } from "react";
import { authAPI } from "../../../api/services/AuthService.ts";
import { useRequestBlock } from "../../../hooks/useRequestBlock.ts";
import { useRequestError } from "../../../hooks/useRequestError.ts";
import { ErrorGroups } from "../../../api/types";
import Form from "../../ui/Form/Form.tsx";
import BackButton from "../../ui/BackButton/BackButton.tsx";

interface ForgotPasswordForm {
  email: string;
}

interface ForgotPasswordFormProps {
  onBack: () => void;
  onForward: () => void;
}

const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({
  onBack,
  onForward,
}) => {
  const { t } = useTranslation();

  const { email } = validationOptions;

  const [forgot, { error, isLoading }] = authAPI.useForgotMutation();

  const errorRequestMessage = useRequestError(ErrorGroups.EMAIL, error);

  const { setRequestBlock, getRequestBlock } = useRequestBlock("forgot");

  const [secondsToUnblock, setSecondsToUnblock] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({ mode: "onChange" });

  const onSubmit: SubmitHandler<ForgotPasswordForm> = async (data) => {
    const result = await forgot({ email: data.email });
    if (!("error" in result)) {
      setRequestBlock(60000);
      onForward();
    }
  };

  useEffect(() => {
    const timeToUnblock = getRequestBlock;

    if (timeToUnblock) {
      const countdown = setInterval(() => {
        setSecondsToUnblock(Math.floor((timeToUnblock - Date.now()) / 1000));
        if (secondsToUnblock < 1) {
          clearInterval(countdown);
        }
      }, 0);

      return () => {
        clearInterval(countdown);
      };
    }
  }, [getRequestBlock, secondsToUnblock]);

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      secondsToUnblock={secondsToUnblock}
      errorRequestMessage={errorRequestMessage}
    >
      <BackButton onClick={onBack} />
      <p className={styles.text}>{t("reset text")}</p>
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
        errorMessage={
          errors.email
            ? errors.email.type === "required"
              ? t("enter email")
              : t("incorrect email")
            : ""
        }
      />
      <Button
        className={styles.button}
        disabled={isLoading || secondsToUnblock > 0}
        isLoading={isLoading}
        type="submit"
      >
        {t("send reset code")}
      </Button>
    </Form>
  );
};

export default ForgotPasswordForm;
