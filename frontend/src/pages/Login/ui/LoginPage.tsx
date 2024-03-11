import styles from "./LoginPage.module.scss";
import { TypeAnimation } from "react-type-animation";
import { useTranslation } from "react-i18next";
import LoginForm from "../../../components/LoginForm/LoginForm.tsx";
import { useState } from "react";
import { LoginState } from "../types";
import FormSwitcher from "../../../components/FormSwitcher/FormSwitcher.tsx";
import RegisterForm from "../../../components/RegisterForm/RegisterForm.tsx";
import ReactCardFlip from "react-card-flip";

const LoginPage = () => {
  const { t, i18n } = useTranslation();

  const a = t("greetings");
  const b = t("pls, login");
  const c = t("register soon");

  const [loginState, setLoginState] = useState(LoginState.LOGIN);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleTabClick = (loginState: LoginState) => {
      setLoginState(loginState)
      setIsFlipped(prev => !prev)
  }

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
                    height: "250px",
                    marginLeft: "50px",
                }}
                repeat={0}
                deletion-speed={0}
            />
            <div className={styles.formWrapper}>
                <FormSwitcher activeTab={loginState} setActiveTab={handleTabClick} />
                {/*{loginState === LoginState.LOGIN ? <LoginForm /> : <RegisterForm />}*/}
                <ReactCardFlip isFlipped={isFlipped} flipDirection={"vertical"}>
                    <LoginForm />
                    <RegisterForm />
                </ReactCardFlip>
            </div>
        </div>
    </main>
  );
};

export default LoginPage;
