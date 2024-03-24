import "./styles/index.scss";
import Header from "../components/Header/Header.tsx";
import classnames from "classnames";
import AppRouter from "./providers/RouterProvider/AppRouter.tsx";
import { useTheme } from "../hooks/useTheme.ts";
import { userApi } from "../api/services/UserService.ts";
import { useCookies } from "react-cookie";
import Spinner, { SpinnerTypes } from "../components/ui/Spinner/Spinner.tsx";
import { useState } from "react";
import Profile from "../components/Profile/Profile.tsx";

function App() {
  const { theme } = useTheme();

  const [{ token }] = useCookies(["token"]);

  const { isLoading } = userApi.useGetMeQuery(token);

  const [isProfileOpened, setIsProfileOpened] = useState(false);

  const appClass = classnames({
    app: true,
    [theme]: true,
    isLoader: isLoading,
  });

  return (
    <div className={appClass}>
      {isLoading ? (
        <Spinner type={SpinnerTypes.APP} />
      ) : (
        <>
          <Header onProfileButtonClick={setIsProfileOpened} />
          <AppRouter />
        </>
      )}
      {isProfileOpened && (
        <Profile
          setProfileOpened={setIsProfileOpened}
          isProfileOpened={setIsProfileOpened}
        />
      )}
    </div>
  );
}

export default App;
