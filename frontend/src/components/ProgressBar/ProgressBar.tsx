import { CircularProgressbar } from "react-circular-progressbar";
import { FC } from "react";

interface ProgressBarProps {
  percentage: number;
  size: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ percentage, size }) => {
  return (
    <div style={{ width: size, height: size }}>
      <CircularProgressbar
        value={percentage}
        text={`${(percentage * 100).toFixed(2)}%`}
      />
    </div>
  );
};

export default ProgressBar;
