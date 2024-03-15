import { Navigate, Outlet } from "react-router-dom";
import { FC } from "react";
import {useAppSelector} from "../../store/store.ts";

interface ProtectedRouteProps {
  onlyForAuth: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ onlyForAuth }) => {
  const { user } = useAppSelector(store => store.user)

  if (!user && onlyForAuth) {
    return <Navigate to="/login" />;
  }

  if (user && !onlyForAuth) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
