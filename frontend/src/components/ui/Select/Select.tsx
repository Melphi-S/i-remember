import styles from "./Select.module.scss";
import {Dispatch, FC, SetStateAction} from "react";
import ReactSelect from "react-select";

export interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  title: string;
  selectedOption: Option | null;
  setSelectedOption: Dispatch<SetStateAction<Option | null>>
}

const Select: FC<SelectProps> = ({ options, title, selectedOption, setSelectedOption }) => {

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>{title}</span>
      <ReactSelect
        value={selectedOption}
        onChange={setSelectedOption}
        options={options}
        classNames={{
          menuList: () => styles.menuList,
        }}
        placeholder={title}
      />
    </div>
  );
};

export default Select;
