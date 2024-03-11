import { forwardRef, InputHTMLAttributes } from "react";
import classnames from "classnames";
import styles from "./Input.module.scss";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  errorMessage?: string;
}


const Input = forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const {
      hasError,
      errorMessage,
      disabled,
       children,
      ...rest
    } = props;

    const inputClassName = classnames({
      [styles.input]: true,
      [styles.inputError]: hasError,
      [styles.disabled]: disabled,
    });

    return (
      <div className={styles.inputWrapper}>
        <input
          className={inputClassName}
          ref={ref}
          {...rest}
        />
        {children}
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
      </div>
    );
  },
);

export default Input;
