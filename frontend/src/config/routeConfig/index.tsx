import { RouteObject } from "react-router-dom";
import {AppRoutes} from "./types.ts";
import {MainPage} from "../../pages/Main";
import {RegisterPage} from "../../pages/Register";


export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN_PAGE]: "/",
    [AppRoutes.REGISTER_PAGE]: "/register",
};

export const routeConfig: RouteObject[]= [
     {
        path: RoutePath.main_page,
        element: <MainPage />
    },
    {
        path: RoutePath.register_page,
        element: <RegisterPage />
    },
];