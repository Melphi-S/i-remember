import { FC} from "react";
import styles from "./FormSwitcher.module.scss";
import Tab from "../ui/Tab/Tab.tsx";
import { LoginState } from "../../pages/Login/types";
import {useTranslation} from "react-i18next";

interface FormSwitcher {
  activeTab: string;
  setActiveTab: (loginState: LoginState) => void;
}

const FormSwitcher: FC<FormSwitcher> = ({ activeTab, setActiveTab }) => {
  const {t} = useTranslation()  
    
  return (
    <div className={styles.switcher}>
      <Tab
        onClick={() => setActiveTab(LoginState.LOGIN)}
        isActive={activeTab === LoginState.LOGIN}
      >
        {t("login")}
      </Tab>
      <Tab
        onClick={() => setActiveTab(LoginState.REGISTER)}
        isActive={activeTab === LoginState.REGISTER}
      >
        {t("registration")}
      </Tab>
    </div>
  );
};

export default FormSwitcher;
