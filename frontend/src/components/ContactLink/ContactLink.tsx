import styles from "./ContactLink.module.scss";
import Telegram from "../../assets/icons/telegram.svg?react";
import Email from "../../assets/icons/email.svg?react";
import Github from "../../assets/icons/github.svg?react";
import { ContactLinkSize, ContactLinkType } from "./types";
import {CONTACT_EMAIL, CONTACT_GITHUB, CONTACT_TELEGRAM} from "../../utils/variables.ts";
import { FC } from "react";
import classnames from "classnames";

interface ContactLink {
  icon: JSX.Element;
  href: string;
}

type ContactLinks = {
  [link in ContactLinkType]: ContactLink;
};

interface ContactLinkProps {
  type: ContactLinkType;
  size: ContactLinkSize;
  withColor?: boolean;
  withInvertedColor?: boolean;
}

const ContactLink: FC<ContactLinkProps> = (props) => {
  const { type, size, withColor = false, withInvertedColor = false } = props;

  const iconClass = classnames({
    [styles[size]]: true,
    [styles.withColor]: withColor,
    [styles.withInvertedColor]: withInvertedColor,
  });

  const links: ContactLinks = {
    [ContactLinkType.TELEGRAM]: {
      icon: <Telegram className={iconClass} />,
      href: `https://t.me/${CONTACT_TELEGRAM}`,
    },
    [ContactLinkType.EMAIL]: {
      icon: <Email className={iconClass} />,
      href: `mailto:${CONTACT_EMAIL}`,
    },
    [ContactLinkType.GITHUB]: {
      icon: <Github className={iconClass} />,
      href: CONTACT_GITHUB,
    },
  };

  return (
    <a href={links[type].href} target="_blank" rel="noopener noreferrer">
      {links[type].icon}
    </a>
  );
};

export default ContactLink;
