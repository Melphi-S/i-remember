import styles from "./RadioButton.module.scss";
import { Dispatch, FC, InputHTMLAttributes, SetStateAction } from "react";

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: string;
  groupValue: string;
  setGroupValue: Dispatch<SetStateAction<string | number>>;
}

const RadioButton: FC<RadioButtonProps> = (props) => {
  const { value, label, groupValue, setGroupValue, ...rest } = props;

  return (
    <label
      htmlFor={value}
      className={styles.button}
      onClick={() => setGroupValue(value)}
    >
      <input
        type="radio"
        checked={value == groupValue}
        onChange={() => setGroupValue(value)}
        {...rest}
      />
      <span>{label}</span>
    </label>
  );
};

export default RadioButton;
