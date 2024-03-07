import './styles/index.scss'
import Header from "../components/Header/Header.tsx";
import classnames from "classnames";
import {useTheme} from "./providers/ThemeProvider";
import AppRouter from "./providers/RouterProvider/AppRouter.tsx";

function App() {
  const {theme} = useTheme()

  const appClass = classnames({
      'app': true,
      [theme]: true
  })

  return (
    <div className={appClass}>
      <Header/>
      <AppRouter/>
    </div>
  )
}

export default App
