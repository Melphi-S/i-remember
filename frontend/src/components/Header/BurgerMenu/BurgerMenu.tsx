import styles from "./BurgerMenu.module.scss";
import Navigation from "../../Navigation/Navigation.tsx";
import { FC, useEffect, useRef } from "react";

interface BurgerMenuProps {
  handleClose: () => void;
}

const BurgerMenu: FC<BurgerMenuProps> = ({ handleClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        target.id !== "menu-button" &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscKeydown);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div ref={ref} className={styles.menu}>
      <Navigation handleClose={handleClose} />
    </div>
  );
};

export default BurgerMenu;
