import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { routeConfig } from "../../../config/routeConfig";
import ProtectedRoute from "../../../components/ProtectedRoute/ProtectedRoute.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {Object.values(routeConfig).map(({ element, path, onlyForAuth }) => (
        <Route
          key={path}
          element={<ProtectedRoute onlyForAuth={onlyForAuth} />}
        >
          <Route key={path} path={path} element={element} />
        </Route>
      ))}
    </>,
  ),
);

const AppRouter = () => {
  return (
      <RouterProvider router={router} />
  );
};

export default AppRouter;
