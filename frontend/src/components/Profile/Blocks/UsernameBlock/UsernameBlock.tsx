import ProfileBlock from "../../../ProfileBlock/ProfileBlock.tsx";
import Input from "../../../ui/Input/Input.tsx";
import { useState } from "react";
import { useAppSelector } from "../../../../store/store.ts";
import { userApi } from "../../../../api/services/UserService.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { FetchResult } from "../../types";
import {useTranslation} from "react-i18next";

interface ChangeNameForm {
  username: string;
}

const UsernameBlock = () => {
  const { user } = useAppSelector((state) => state.user);

  const [newUsername, setNewUsername] = useState(user?.username);

  const {t} = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
  } = useForm<ChangeNameForm>({ mode: "onChange" });

  const [fetchResult, setFetchResult] = useState<FetchResult | null>(null);

  const [patch, { isLoading }] = userApi.usePatchMutation();

  const onSubmit: SubmitHandler<ChangeNameForm> = async (data) => {
    const result = await patch(data);

    if ("error" in result) {
      setFetchResult(FetchResult.ERROR);
      await new Promise((res) => setTimeout(res, 2000));
      setFetchResult(null);
    } else {
      setFetchResult(FetchResult.SUCCESS);
      await new Promise((res) => setTimeout(res, 2000));
      setFetchResult(null);
    }
  };

  return (
    <ProfileBlock
      title={t('change username')}
      onSubmit={handleSubmit(onSubmit)}
      fetchError={fetchResult === FetchResult.ERROR}
      fetchSuccess={fetchResult === FetchResult.SUCCESS}
      isLoading={isLoading}
      isPrevValue={newUsername === user?.username}
      onCancel={() => {
        setNewUsername(user?.username);
        clearErrors();
      }}
      isValid={isValid}
    >
      <Input
        {...register("username", {
          required: t("enter username"),
          minLength: {
            value: 2,
            message: t("username length"),
          },
          maxLength: {
            value: 15,
            message: t("username length"),
          },
          onChange: (e) => setNewUsername(e.target.value),
        })}
        value={newUsername}
        placeholder={t("username")}
        hasError={Boolean(errors.username)}
        errorMessage={
          errors.username
            ? errors.username.type === "required"
              ? t("enter username")
              : t("username length")
            : ""
        }
      />
    </ProfileBlock>
  );
};

export default UsernameBlock;
