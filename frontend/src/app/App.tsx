import "./styles/index.scss";
import Header from "../components/Header/Header.tsx";
import classnames from "classnames";
import AppRouter from "./providers/RouterProvider/AppRouter.tsx";
import { useTheme } from "../hooks/useTheme.ts";
import { userApi } from "../api/services/UserService.ts";
import { useCookies } from "react-cookie";
import Spinner, { SpinnerTypes } from "../components/ui/Spinner/Spinner.tsx";

function App() {
  const { theme } = useTheme();

  const [{ token }] = useCookies(["token"]);

  const { data, isLoading, error } = userApi.useGetMeQuery(token);

  const appClass = classnames({
    app: true,
    [theme]: true,
  });

  return (
    <div className={appClass}>
      {isLoading ? (
        <Spinner type={SpinnerTypes.APP} />
      ) : (
        <>
          <Header />
          <AppRouter />
        </>
      )}
    </div>
  );
}

export default App;
