/// <reference types="vite-plugin-svgr/client" />
import styles from './Accordion.module.scss';
import { ButtonHTMLAttributes, FC } from "react";
import Arrow from '../../../assets/icons/arrow up-down.svg?react'
import classnames from "classnames";

interface AccordionHeaderProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpened: boolean;
}

const AccordionHeader: FC<AccordionHeaderProps> = ({
  isOpened,
  children,
  ...rest
}) => {
  const arrowClass = classnames({
    [styles.icon]: true,
    [styles.isOpened]: isOpened
  })

  return <button className={styles.header} {...rest}>
    <Arrow className={arrowClass}/>
    {children}
    <Arrow className={arrowClass}/>
  </button>;
};

export default AccordionHeader;
