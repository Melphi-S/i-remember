import styles from './Switcher.module.scss'
import {FC, InputHTMLAttributes} from "react";
import classnames from "classnames";

export enum SwitcherTypes {
    LANGUAGE = 'language_switcher',
    THEME = 'theme_switcher'
}

interface SwitcherProps extends InputHTMLAttributes<HTMLInputElement>{
    type: SwitcherTypes,
    isInvertedBackground?: boolean,
}

const Switcher: FC<SwitcherProps> = ({type, isInvertedBackground = false, ...rest}) => {

    const knobClass = classnames({
        [styles.knob]: true,
        [styles[type]]: true
    })

    const buttonClass = classnames({
        [styles.button]: true,
        [styles.invertedButton]: isInvertedBackground
    })

    const leftClass = classnames({
        [styles.span]: true,
        [styles.invertedSpan]: isInvertedBackground,
        [styles.left]: true
    })

    const rightClass = classnames({
        [styles.span]: true,
        [styles.invertedSpan]: isInvertedBackground,
        [styles.right]: true
    })

    const knobSides = {
        left: {
            [SwitcherTypes.LANGUAGE]: 'Rus',
            [SwitcherTypes.THEME]: 'Dark'
        },
        right: {
            [SwitcherTypes.LANGUAGE]: 'Eng',
            [SwitcherTypes.THEME]: 'Light'
        }
    }

    return (
        <div className={styles.wrapper}>
            <input className={styles.checkbox} type="checkbox" id={type} {...rest}/>

                <label className={buttonClass} htmlFor={type}>
                    <div className={knobClass}></div>
                    <div className={leftClass}>{knobSides.left[type]}</div>
                    <div className={rightClass}>{knobSides.right[type]}</div>
                </label>
        </div>
    );
};

export default Switcher;