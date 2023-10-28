import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { IRoute } from "../types/RouteType";
import { routes as dashboardRoutes, authRoutes, default_routes } from "./index";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import { RootState } from "../redux/store/store";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getUserFromToken } from "../util/util";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";

const ModifiedMainLayout = () => {
  return (
    <MainLayout>
      <ToastContainer />
      <Outlet />
    </MainLayout>
  );
};

const ModifiedAuthLayout = () => {
  return (
    <AuthLayout>
      <ToastContainer />
      <Outlet />
    </AuthLayout>
  );
};

const RedirectComponent: FC = (): any => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);
};

const AppRoutes: FC = () => {

  const [cookies, setCookie, removeCookie] = useCookies(["usertoken"]);

  const [role, setRole] = useState(4);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  
  useEffect(()=> {

    const usertoken = cookies.usertoken;

    const user : any = usertoken ? jwtDecode(usertoken) : null;

    if(user) {
      setRole(parseInt(user?.role_id, 10));
      setIsAuthenticated(true);
    } else {
      setRole(4);
      setIsAuthenticated(false);
    } 
    console.log('ssss')
  }, [cookies])

  return (
    <>
      {isAuthenticated ? (
        <>
          <Routes>
            <Route element={<ModifiedMainLayout />}>
              {default_routes.map((route: IRoute) => (
                <Route
                  key={route.key}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Route>
          </Routes>
          <Routes>
            <Route element={<ModifiedMainLayout />}>
              {dashboardRoutes.map((route: IRoute) => (
                <Route
                  key={route.key}
                  path={route.path}
                  element={
                    (route.permission ? route.permission : 4) >= role ? (
                      <route.component />
                    ) : (
                      <RedirectComponent />
                    )
                  }
                />
              ))}
            </Route>
          </Routes>
        </>
      ) : (
        <React.Fragment>
          <Routes>
            <Route element={<ModifiedAuthLayout />}>
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
      )}
    </>
  );
};

export default AppRoutes;
