import { Dispatch } from "redux";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { AxiosResponse } from "axios";
import axios from "../../services/axios";

import { IAuth as Auth } from "../../models/auth";
import { ThunkResult } from "./actionResultTypes";
import {
  Action,
  ActionType,
  IAuthFail,
  IAuthLogout,
  IAuthStart,
  IAuthSuccess,
} from "../actionTypes/authActionTypes";
import { RootState } from "../store/store";

// Headers
type Config = {
  headers: Record<string, string>;
};

const saveToken = (token: string) => {
  const cookies = new Cookies();
  cookies.set("token", token, { path: "/" });
};

export const AuthStart =
  (user_id: string, password: string): any =>
  async (dispatch: Dispatch<Action>) => {
    dispatch<IAuthStart>({ type: ActionType.AUTH_START });
    // Request Header
    const config: Config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // Request Body
    const body = JSON.stringify({
      user_id,
      password,
    });
    try {
      const response: AxiosResponse<Auth> = await axios.post(
        `/auth/login`,
        body,
        config
      );
      // Save the token to a cookie using react-cookie
      const token = response.data.access_token;
      saveToken(token);

      dispatch<IAuthSuccess>({
        type: ActionType.AUTH_SUCCESS,
        payload: response.data,
      });
    } catch (err: any) {
      dispatch<IAuthFail>({
        type: ActionType.AUTH_FAIL,
        payload: err,
      });
    }
  };

  // Logout action
export const logout = (navigate: any): any => {


    return (dispatch: Dispatch<Action>) => {
      navigate('/');
      // Remove the token cookie
      const cookies = new Cookies();
      cookies.remove("token");
      dispatch<IAuthLogout>({
        type: ActionType.AUTH_LOGOUT,
        payload: ''
      });
    };
  };
