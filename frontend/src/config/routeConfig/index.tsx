import { RouteObject } from "react-router-dom";
import {AppRoutes} from "./types.ts";
import {MainPage} from "../../pages/Main";
import {LoginPage} from "../../pages/Login";



export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN_PAGE]: "/",
    [AppRoutes.LOGIN_PAGE]: "/login",
};

export const routeConfig: RouteObject[]= [
     {
        path: RoutePath.main_page,
        element: <MainPage />
    },
    {
        path: RoutePath.login_page,
        element: <LoginPage/>
    },
];