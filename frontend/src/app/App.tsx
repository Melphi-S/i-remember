import "./styles/index.scss";
import classnames from "classnames";
import AppRouter from "./providers/RouterProvider/AppRouter.tsx";
import { useTheme } from "../hooks/useTheme.ts";

function App() {
  const { theme } = useTheme();

  const appClass = classnames({
    app: true,
    [theme]: true,
  });

  return (
    <div className={appClass}>
      <AppRouter />
    </div>
  );
}

export default App;
