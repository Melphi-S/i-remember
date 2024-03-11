import './styles/index.scss'
import Header from "../components/Header/Header.tsx";
import classnames from "classnames";
import AppRouter from "./providers/RouterProvider/AppRouter.tsx";
import {useTheme} from "../hooks/useTheme.ts";

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
