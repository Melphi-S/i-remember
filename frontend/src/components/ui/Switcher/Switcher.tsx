import styles from './Switcher.module.scss'
import {FC, InputHTMLAttributes} from "react";
import classnames from "classnames";

export enum SwitcherTypes {
    LANGUAGE = 'language_switcher',
    THEME = 'theme_switcher'
}

interface SwitcherProps extends InputHTMLAttributes<HTMLInputElement>{
    type: SwitcherTypes
}

const Switcher: FC<SwitcherProps> = ({type, ...rest}) => {

    const knobClass = classnames({
        [styles.knob]: true,
        [styles[type]]: true
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

                <label className={styles.button} htmlFor={type}>
                    <div className={knobClass}></div>
                    <div className={styles.left}>{knobSides.left[type]}</div>
                    <div className={styles.right}>{knobSides.right[type]}</div>
                </label>
        </div>
    );
};

export default Switcher;