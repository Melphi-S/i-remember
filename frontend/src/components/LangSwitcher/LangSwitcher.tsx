import { useTranslation } from "react-i18next";
import Switcher, { SwitcherTypes } from "../ui/Switcher/Switcher.tsx";
import {Language, LOCAL_STORAGE_LANGUAGE_KEY} from "../../config/i18nConfig";


const LangSwitcher = () => {
    const { i18n } = useTranslation()

    const toggleLang = async () => {
        const newLang = i18n.language === Language.RUSSIAN ? Language.ENGLISH : Language.RUSSIAN;
        await i18n.changeLanguage(newLang)
        localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, newLang)
    }

    return (
        <Switcher type={SwitcherTypes.LANGUAGE} onChange={toggleLang} checked={i18n.language === Language.RUSSIAN}/>
    );
};

export default LangSwitcher;