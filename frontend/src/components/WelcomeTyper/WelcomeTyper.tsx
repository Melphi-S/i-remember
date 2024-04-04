import { TypeAnimation } from "react-type-animation";
import { useTranslation } from "react-i18next";

const WelcomeTyper = () => {
  const { t, i18n } = useTranslation();

  return (
    <TypeAnimation
      key={i18n.language}
      sequence={[
        `${t("greetings")}\n${t("pls, login")}\n \n${t("register soon")}`,
        1000,
        "",
      ].reduce((acc: (string | number)[], curr) => {
        if (typeof curr === "string") {
          const lastString =
            acc.filter((item) => typeof item === "string").pop() || "";
          acc.push((lastString + " " + curr).trim());
        } else {
          acc.push(curr);
        }
        return acc;
      }, [])}
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
  );
};

export default WelcomeTyper;
