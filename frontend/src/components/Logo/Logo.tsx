import styles from "./Logo.module.scss";
import logo from "../../assets/icons/logo.png";
import logoMobile from "../../assets/icons/logo-mobile.png";
import { useLocation, useNavigate } from "react-router-dom";
import classnames from "classnames";
import { useResize } from "../../hooks/useResize.tsx";

const Logo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  const logoClass = classnames({
    [styles.logo]: true,
    [styles.pointer]: !isLoginPage,
  });

  const { isMobileScreen } = useResize();

  return (
    <img
      src={!isMobileScreen ? logo : logoMobile}
      alt="logo."
      className={logoClass}
      onClick={!isLoginPage ? () => navigate("/") : () => {}}
    />
  );
};

export default Logo;
