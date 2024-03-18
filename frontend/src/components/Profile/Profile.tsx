import styles from "./Profile.module.scss";
import Modal, { ModalFor } from "../Modal/Modal.tsx";
import { Dispatch, FC, SetStateAction } from "react";
import UsernameBlock from "./Blocks/UsernameBlock.tsx";

interface ProfileProps {
  isProfileOpened: Dispatch<SetStateAction<boolean>>;
}

const Profile: FC<ProfileProps> = ({ isProfileOpened }) => {
  return (
    <Modal forType={ModalFor.PROFILE} closeModal={() => isProfileOpened(false)}>
      <div className={styles.profile}>
        <ul className={styles.forms}>
          <UsernameBlock />
        </ul>
      </div>
    </Modal>
  );
};

export default Profile;
