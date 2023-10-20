import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { IRoute } from "../types/RouteType";
import { routes as dashboardRoutes, authRoutes, default_routes } from "./index";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import { RootState } from "../redux/store/store";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

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
interface IUser {
  name: string,
  user_id?: string | null,
  role_id: string ,
}
const RedirectComponent: FC = (): any => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  };

const AppRoutes: FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['usertoken']);
  let isAuthenticated: boolean = false;
  const token = cookies.usertoken;

  if (!token) {
    isAuthenticated = false;
  } else {
    isAuthenticated = true;
  }

  const usertoken = cookies.usertoken;
    
  let role : number = 0;
  if(usertoken) {
    console.log(usertoken)
    const user:IUser = jwt_decode(usertoken);
    role = user ? parseInt(user.role_id, 10) : 4 ;
  }

  const user: any = useSelector((state: RootState) => state.auth.user);

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
