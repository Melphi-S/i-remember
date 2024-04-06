import styles from "./BackButton.module.scss"
import {ButtonHTMLAttributes, FC} from "react";
import BackArrow from "../../../assets/icons/arrow-left.svg?react";

const BackButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({onClick, ...rest}) => {
    return (
        <button className={styles.backButton} onClick={onClick} {...rest}>
            <BackArrow className={styles.backIcon} /> Back
        </button>
    );
};

export default BackButton;