import { Navigate, Outlet } from "react-router-dom";
import { FC } from "react";
import {useAppSelector} from "../../store/store.ts";
import {RoutePath} from "../../config/routeConfig";

interface ProtectedRouteProps {
  onlyForAuth: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ onlyForAuth }) => {
  const { user } = useAppSelector(store => store.user)

  if (!user && onlyForAuth) {
    return <Navigate to={RoutePath.login_page} />;
  }

  if (user && !onlyForAuth) {
    return <Navigate to={RoutePath.main_page} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
