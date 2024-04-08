import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FetchResult } from "../../types";
import { userApi } from "../../../../api/services/UserService.ts";
import ProfileBlock from "../../../ProfileBlock/ProfileBlock.tsx";
import InputPassword from "../../../ui/InputPassword/InputPassword.tsx";
import { validationOptions } from "../../../../utils/variables.ts";
import { useTranslation } from "react-i18next";

interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const PasswordBlock = () => {
  const { password } = validationOptions;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    clearErrors,
    reset,
  } = useForm<ChangePasswordForm>({
    mode: "onChange",
    defaultValues: { oldPassword: "", newPassword: "", confirmNewPassword: "" },
  });

  const [fetchResult, setFetchResult] = useState<FetchResult | null>(null);

  const [fetchErrorMessage, setFetchErrorMessage] = useState("");

  const [changePassword, { isLoading }] = userApi.useChangePasswordMutation();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { t } = useTranslation();

  const onSubmit: SubmitHandler<ChangePasswordForm> = async (data) => {
    const result = await changePassword({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });

    if ("error" in result) {
      setFetchResult(FetchResult.ERROR);
      if ("status" in result.error && result.error.status === 401) {
        setFetchErrorMessage(t("wrong password"));
      }
      await new Promise((res) => setTimeout(res, 2000));
      setFetchResult(null);
      setFetchErrorMessage("");
    } else {
      setFetchResult(FetchResult.SUCCESS);
      await new Promise((res) => setTimeout(res, 2000));
      setFetchResult(null);
      reset();
    }
  };

  return (
    <ProfileBlock
      title={t("change password")}
      onSubmit={handleSubmit(onSubmit)}
      fetchError={fetchResult === FetchResult.ERROR}
      fetchSuccess={fetchResult === FetchResult.SUCCESS}
      fetchErrorMessage={fetchErrorMessage}
      isLoading={isLoading}
      isPrevValue={getValues("oldPassword") === getValues("newPassword")}
      onCancel={() => {
        reset();
        clearErrors();
      }}
      isValid={isValid}
    >
      <InputPassword
        {...register("oldPassword", {
          required: t("enter password"),
          pattern: {
            value: password.regExp,
            message: t("incorrect password"),
          },
        })}
        placeholder={t("old password")}
        hasError={Boolean(errors.oldPassword)}
        errorMessage={
          errors.oldPassword
            ? errors.oldPassword.type === "required"
              ? t("enter old password")
              : t("incorrect password")
            : ""
        }
        isVisible={isPasswordVisible}
        setIsVisible={setIsPasswordVisible}
      />
      <InputPassword
        {...register("newPassword", {
          required: t("enter new password"),
          pattern: {
            value: password.regExp,
            message: t("incorrect password"),
          },
        })}
        placeholder={t("new password")}
        hasError={Boolean(errors.newPassword)}
        errorMessage={
          errors.newPassword
            ? errors.newPassword.type === "required"
              ? t("enter password")
              : t("incorrect password")
            : ""
        }
        isVisible={isPasswordVisible}
        setIsVisible={setIsPasswordVisible}
      />
      <InputPassword
        {...register("confirmNewPassword", {
          required: t("new password again"),
          validate: (value) =>
            value === getValues("newPassword") || t("no match"),
        })}
        placeholder={t("confirm new password")}
        hasError={Boolean(errors.confirmNewPassword)}
        errorMessage={
          errors.confirmNewPassword
            ? errors.confirmNewPassword.type === "required"
              ? t("password again")
              : t("no match")
            : ""
        }
        isVisible={isPasswordVisible}
        setIsVisible={setIsPasswordVisible}
      />
    </ProfileBlock>
  );
};

export default PasswordBlock;
