import styles from './VerifyForm.module.scss';
import {useTranslation} from "react-i18next";
import {authAPI} from "../../../api/services/AuthService.ts";
import {useRequestError} from "../../../hooks/useRequestError.ts";
import {ErrorGroups} from "../../../api/types";
import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import Form from "../../ui/Form/Form.tsx";
import BackButton from "../../ui/BackButton/BackButton.tsx";
import Input from "../../ui/Input/Input.tsx";
import Button from "../../ui/Button/Button.tsx";

interface VerifyForm {
    code: string;
}

interface VerifyFormProps {
    onBack: () => void;
}

const VerifyForm: FC<VerifyFormProps> = ({onBack}) => {
    const { t } = useTranslation();

    const [verify, { error, isLoading }] = authAPI.useVerifyMutation();

    const errorRequestMessage = useRequestError(ErrorGroups.WRONG_CODE, error);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<VerifyForm>({ mode: "onChange" });

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<VerifyForm> = async (data) => {
        const result = await verify(data.code);

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
            <p className={styles.text}>{t("verify text")}</p>
            <Input
                {...register("code", {
                    required: t('enter activation code')
                })}
                placeholder={t("reset code")}
                hasError={Boolean(errors.code)}
                errorMessage={errors.code?.message}
            />
            <Button
                disabled={isLoading}
                isLoading={isLoading}
                className={styles.button}
                type="submit"
            >
                {t("activate account")}
            </Button>
        </Form>
    );
};

export default VerifyForm;