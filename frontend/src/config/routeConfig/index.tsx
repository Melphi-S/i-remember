import {RouteProps} from "react-router-dom";
import {AppRoutes} from "./types.ts";
import {MainPage} from "../../pages/Main";
import {LoginPage} from "../../pages/Login";

type ProtectedRouteProps = {
    onlyForAuth: boolean;
} & RouteProps;


export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN_PAGE]: "/",
    [AppRoutes.LOGIN_PAGE]: "/login",
};

export const routeConfig: Record<AppRoutes, ProtectedRouteProps> = {
    [AppRoutes.MAIN_PAGE]: {
        path: RoutePath.main_page,
        element: <MainPage />,
        onlyForAuth: true
    },
    [AppRoutes.LOGIN_PAGE]: {
        path: RoutePath.login_page,
        element: <LoginPage />,
        onlyForAuth: false
    },
}
