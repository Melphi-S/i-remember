import styles from './Block.module.scss'
import {FC, HTMLProps} from "react";
import classnames from "classnames";

interface BlockProps extends HTMLProps<HTMLDivElement> {
    className?: string;
}

const Block: FC<BlockProps> = (props) => {
    const {className = '', children, ...rest} = props;

    const blockClass = classnames({
        [styles.block]: true,
        [className]: true
    })

    return (
        <div className={blockClass} {...rest}>
            {children}
        </div>
    );
};

export default Block;