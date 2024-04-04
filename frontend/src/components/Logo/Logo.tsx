import styles from "./Logo.module.scss";
import logo from "../../assets/icons/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import classnames from "classnames";

const Logo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  const logoClass = classnames({
    [styles.logo]: true,
    [styles.pointer]: !isLoginPage,
  });

  return (
    <img
      src={logo}
      alt="logo."
      className={logoClass}
      onClick={!isLoginPage ? () => navigate("/") : () => {}}
    />
  );
};

export default Logo;
