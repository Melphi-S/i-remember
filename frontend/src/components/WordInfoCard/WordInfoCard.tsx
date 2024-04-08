import styles from './WordInfoCard.module.scss';
import classnames from "classnames";
import {FC, HTMLAttributes} from "react";
import {WordColors} from "../Sticker/types";

interface WordInfoCardProps extends HTMLAttributes<HTMLDivElement> {
    color: WordColors
}

const WordInfoCard: FC<WordInfoCardProps> = ({color, children}) => {
    const cardClass = classnames({
        [styles.card]: true,
        [styles[color]]: true,
    });

    return (
        <div className={cardClass}>
            {children}
        </div>
    );
};

export default WordInfoCard;