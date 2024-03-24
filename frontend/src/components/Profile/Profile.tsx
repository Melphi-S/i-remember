import styles from "./Profile.module.scss";
import Modal, { ModalFor } from "../Modal/Modal.tsx";
import { Dispatch, FC, SetStateAction } from "react";
import UsernameBlock from "./Blocks/UsernameBlock/UsernameBlock.tsx";
import AvatarBlock from "./Blocks/AvatarBlock/AvatarBlock.tsx";
import PasswordBlock from "./Blocks/PasswordBlock/PasswordBlock.tsx";
import WordsPerDayBlock from "./Blocks/WordsPerDayBlock/WordsPerDayBlock.tsx";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher.tsx";
import LangSwitcher from "../LangSwitcher/LangSwitcher.tsx";
import { useAppDispatch } from "../../store/store.ts";
import { logout } from "../../store/reducers/UserSlice.ts";

interface ProfileProps {
  isProfileOpened: Dispatch<SetStateAction<boolean>>;
  setProfileOpened: Dispatch<SetStateAction<boolean>>;
}

const Profile: FC<ProfileProps> = ({ isProfileOpened, setProfileOpened }) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setProfileOpened(false)
  };

  return (
    <Modal forType={ModalFor.PROFILE} closeModal={() => isProfileOpened(false)}>
      <div className={styles.profile}>
        <ul className={styles.forms}>
          <UsernameBlock />
          <AvatarBlock />
          <PasswordBlock />
          <WordsPerDayBlock />
        </ul>
        <div className={styles.footer}>
          <div className={styles.switchers}>
            <ThemeSwitcher isInvertedBackground={true} />
            <LangSwitcher isInvertedBackground={true} />
          </div>
          <button className={styles.logout} onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Profile;
