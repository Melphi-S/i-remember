import styles from "./Parameter.module.scss";
import { FC, HTMLAttributes } from "react";
import classnames from "classnames";
import { ParameterSize } from "./types";
import Loader from "../../../ui/Loader/Loader.tsx";

interface ParameterProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  index: number;
  size?: ParameterSize;
  className?: string;
  isLoading?: boolean;
}

const Parameter: FC<ParameterProps> = (props) => {
  const {
    title,
    index,
    size = ParameterSize.COMMON,
    className = "",
    isLoading = false,
  } = props;

  const parameterWrapperClass = classnames({
    [styles.parameterWrapper]: true,
    [className]: true,
  });

  const parameterClass = classnames({
    [styles.parameter]: true,
    [styles.parameter_size_common]: size === ParameterSize.COMMON,
    [styles.parameter_size_large]: size === ParameterSize.LARGE,
  });

  return (
    <div className={parameterWrapperClass}>
      <span className={parameterClass}>{title}</span>
      {!isLoading ? (
        <span className={parameterClass}>{index}</span>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Parameter;
