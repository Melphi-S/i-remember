import styles from "./LoginPage.module.scss";
import { TypeAnimation } from "react-type-animation";
import { useTranslation } from "react-i18next";
import LoginForm from "../../../components/Forms/LoginForm/LoginForm.tsx";
import { useState } from "react";
import { LoginState } from "../types";
import FormSwitcher from "../../../components/FormSwitcher/FormSwitcher.tsx";
import RegisterForm from "../../../components/Forms/RegisterForm/RegisterForm.tsx";
import ReactCardFlip from "react-card-flip";
import ForgotPasswordForm from "../../../components/Forms/ForgotPasswordForm/ForgotPasswordForm.tsx";
import ResetPasswordForm from "../../../components/Forms/ResetPasswordForm/ResetPasswordForm.tsx";
import VerifyForm from "../../../components/Forms/VerifyForm/VerifyForm.tsx";

enum AdditionalState {
  RESET_CODE = "reset_code",
  RESET_REQUEST = "reset_request",
  CONFIRM_CODE = "confirm_code",
}

const LoginPage = () => {
  const { t, i18n } = useTranslation();

  const a = t("greetings");
  const b = t("pls, login");
  const c = t("register soon");

  const [loginState, setLoginState] = useState(LoginState.LOGIN);
  const [isFlipped, setIsFlipped] = useState(false);

  const [additionalState, setAdditionalState] =
    useState<AdditionalState | null>(null);

  const handleTabClick = (loginState: LoginState) => {
    setLoginState(loginState);
    setIsFlipped(loginState === LoginState.REGISTER);
  };

  const formState = () => {
    if (additionalState === AdditionalState.RESET_CODE) {
      return (
        <ForgotPasswordForm
          onBack={() => setAdditionalState(null)}
          onForward={() => setAdditionalState(AdditionalState.RESET_REQUEST)}
        />
      );
    }

    if (additionalState === AdditionalState.RESET_REQUEST) {
      return (
        <ResetPasswordForm
          onBack={() => setAdditionalState(AdditionalState.RESET_CODE)}
        />
      );
    }

    if (additionalState === AdditionalState.CONFIRM_CODE) {
      return (
        <VerifyForm
          onBack={() => {
            setAdditionalState(null);
            setIsFlipped(true);
          }}
        />
      );
    }

    return (
      <>
        <FormSwitcher activeTab={loginState} setActiveTab={handleTabClick} />
        <ReactCardFlip isFlipped={isFlipped} flipDirection={"vertical"}>
          <LoginForm
            onResetRequest={() =>
              setAdditionalState(AdditionalState.RESET_CODE)
            }
          />
          <RegisterForm
            onForward={() => setAdditionalState(AdditionalState.CONFIRM_CODE)}
          />
        </ReactCardFlip>
      </>
    );
  };

  return (
    <main className={styles.page}>
      <div className={styles.wrapper}>
        <TypeAnimation
          key={i18n.language}
          sequence={[`${a}\n${b}\n \n${c}`, 1000, ""].reduce(
            (acc: (string | number)[], curr) => {
              if (typeof curr === "string") {
                const lastString =
                  acc.filter((item) => typeof item === "string").pop() || "";
                acc.push((lastString + " " + curr).trim());
              } else {
                acc.push(curr);
              }
              return acc;
            },
            [],
          )}
          wrapper="span"
          speed={20}
          style={{
            whiteSpace: "pre-line",
            fontSize: "50px",
            lineHeight: "58px",
            height: "300px",
            marginLeft: "50px",
          }}
          repeat={0}
          deletion-speed={0}
        />
        <div className={styles.formWrapper}>{formState()}</div>
      </div>
    </main>
  );
};

export default LoginPage;
