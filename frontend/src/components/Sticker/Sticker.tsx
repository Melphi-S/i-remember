import styles from "./Sticker.module.scss";
import { FC, HTMLProps, useMemo, useState } from "react";
import classnames from "classnames";

interface StickerProps extends HTMLProps<HTMLDivElement> {
  className?: string;
}

const stickerColors = ["#ff9", "#cfc", "#ccf"];

const Sticker: FC<StickerProps> = (props) => {
  const { className = "", children, ...rest } = props;
  const [hovered, setHovered] = useState(false);

  const stickerClass = classnames({
    [styles.sticker]: true,
    [className]: true,
  });

  const randomStyle = useMemo(
    () => ({
      degree:
        Math.ceil(Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1),
      color: stickerColors[Math.floor(Math.random() * stickerColors.length)],
    }),
    [],
  );

  return (
    <div
      className={stickerClass}
      style={
        !hovered
          ? {
              transform: `rotate(${randomStyle.degree}deg)`,
              backgroundColor: randomStyle.color,
            }
          : { backgroundColor: randomStyle.color }
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Sticker;
