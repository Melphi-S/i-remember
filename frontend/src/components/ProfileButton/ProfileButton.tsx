import styles from "./ProfileButton.module.scss";
import { useAppSelector } from "../../store/store.ts";
import { useTranslation } from "react-i18next";
import { Dispatch, FC, SetStateAction } from "react";
import { useResize } from "../../hooks/useResize.tsx";

interface ProfileButton {
  onClick: Dispatch<SetStateAction<boolean>>;
}

const ProfileButton: FC<ProfileButton> = ({ onClick }) => {
  const { t } = useTranslation();
  const { user } = useAppSelector((store) => store.user);

  const { isMobileScreen } = useResize();

  return (
    <>
      {user && (
        <button
          className={styles.button}
          onClick={() => onClick((prev) => !prev)}
        >
          {!isMobileScreen && <span>{user.username}</span>}
          <img className={styles.avatar} src={user.avatar} alt={t("avatar")} />
        </button>
      )}
    </>
  );
};

export default ProfileButton;
