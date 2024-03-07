import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {routeConfig} from "../../../config/routeConfig";
import {Suspense} from "react";

const router = createBrowserRouter(routeConfig)

const AppRouter = () => {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <RouterProvider router={router}/>
        </Suspense>
    );
};

export default AppRouter;