import styles from "./Footer.module.scss";
import { useTranslation } from "react-i18next";
import ContactLink from "../ContactLink/ContactLink.tsx";
import { ContactLinkSize, ContactLinkType } from "../ContactLink/types";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.iconsWrapper}>
        <ContactLink
          type={ContactLinkType.TELEGRAM}
          size={ContactLinkSize.SMALL}
        />
        <ContactLink
          type={ContactLinkType.EMAIL}
          size={ContactLinkSize.SMALL}
          withInvertedColor={true}
        />
        <ContactLink
          type={ContactLinkType.GITHUB}
          size={ContactLinkSize.SMALL}
          withInvertedColor={true}
        />
      </div>
      <p className={styles.copyright}>{t("copyright")}</p>
    </footer>
  );
};

export default Footer;
