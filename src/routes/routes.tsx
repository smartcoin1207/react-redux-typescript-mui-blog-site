import React, { FC }  from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { IRoute } from "../types/RouteType";
import { routes as dashboardRoutes, authRoutes } from "./index";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import { RootState } from '../redux/store/store';


const ModifiedMainLayout = () => {
    return (
        <MainLayout>
            <Outlet />  
        </MainLayout>
    )
    };

const ModifiedAuthLayout = () => {
    return (
        <AuthLayout>
            <Outlet />  
        </AuthLayout>
    )
};

const AppRoutes: FC = () => {
    const [cookies] = useCookies(["token"]);
    let isAuthenticated:boolean = false;
    const token = cookies.token;

    if(!token) {
        isAuthenticated = false;
    } else {
        isAuthenticated = true;
    }

    const authToken1: string = useSelector(
        (state: RootState) =>  state.auth.authToken 
    )

    return (
        <>
            {isAuthenticated ? 
                <Routes>
                    <Route element={<ModifiedMainLayout/>}>
                    {dashboardRoutes.map((route: IRoute) => (
                        <Route
                            key={route.key}
                            path={route.path}
                            element={<route.component />}
                        />
                    ))}
                    </Route>
                </Routes>
            :
                <React.Fragment>
                    <Routes>
                        <Route element={<ModifiedAuthLayout/>}>
                        {authRoutes.map((route: IRoute) => (
                            <Route
                                key={route.key}
                                path={route.path}
                                element={<route.component />}
                            />
                        ))}
                        </Route>
                    </Routes>
                </React.Fragment>
            }
        </>
    )
}

export default AppRoutes;