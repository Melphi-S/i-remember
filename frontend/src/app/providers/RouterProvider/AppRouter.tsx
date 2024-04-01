import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { routeConfig } from "../../../config/routeConfig";
import ProtectedRoute from "../../../components/ProtectedRoute/ProtectedRoute.tsx";
import { useCookies } from "react-cookie";
import { userApi } from "../../../api/services/UserService.ts";
import { useState } from "react";
import Header from "../../../components/Header/Header.tsx";
import Spinner, {
  SpinnerTypes,
} from "../../../components/ui/Spinner/Spinner.tsx";
import Profile from "../../../components/Profile/Profile.tsx";

function RootLayout() {
  const [{ token }] = useCookies(["token"]);

  const { isLoading } = userApi.useGetMeQuery(token);

  const [isProfileOpened, setIsProfileOpened] = useState(false);

  return (
    <>
      <Header onProfileButtonClick={setIsProfileOpened} />
      {isLoading ? <Spinner type={SpinnerTypes.APP} /> : <Outlet />}
      {isProfileOpened && (
        <Profile
          setProfileOpened={setIsProfileOpened}
          isProfileOpened={setIsProfileOpened}
        />
      )}
    </>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      {Object.values(routeConfig).map(({ element, path, onlyForAuth }) => (
        <Route
          key={path}
          element={<ProtectedRoute onlyForAuth={onlyForAuth} />}
        >
          <Route key={path} path={path} element={element} />
        </Route>
      ))}
    </Route>,
  ),
);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
