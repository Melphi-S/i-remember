import styles from "./LoginPage.module.scss";
import LoginForm from "../../../components/Forms/LoginForm/LoginForm.tsx";
import { useState } from "react";
import { LoginState } from "../types";
import FormSwitcher from "../../../components/FormSwitcher/FormSwitcher.tsx";
import RegisterForm from "../../../components/Forms/RegisterForm/RegisterForm.tsx";
import ReactCardFlip from "react-card-flip";
import ForgotPasswordForm from "../../../components/Forms/ForgotPasswordForm/ForgotPasswordForm.tsx";
import ResetPasswordForm from "../../../components/Forms/ResetPasswordForm/ResetPasswordForm.tsx";
import VerifyForm from "../../../components/Forms/VerifyForm/VerifyForm.tsx";
import WelcomeTyper from "../../../components/WelcomeTyper/WelcomeTyper.tsx";

enum AdditionalState {
  RESET_CODE = "reset_code",
  RESET_REQUEST = "reset_request",
  CONFIRM_CODE = "confirm_code",
}

const LoginPage = () => {
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
        <WelcomeTyper />
        <div className={styles.formWrapper}>{formState()}</div>
      </div>
    </main>
  );
};

export default LoginPage;
