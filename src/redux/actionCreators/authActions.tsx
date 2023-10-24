import { Dispatch } from "redux";
import Cookies from 'universal-cookie';
import { AxiosResponse } from "axios";
import axios from "../../services/axios";
import { IAuth as Auth } from "../../models/auth";
import { ThunkResult } from "./actionResultTypes";
import { ToastMessage } from "../../util/toast";
import { removeToken, removeUserToken, setToken, setUserToken } from "../../util/util";
import {
  Action,
  ActionType,
  IAuthFail,
  IAuthLogout,
  IAuthStart,
  IAuthSuccess,
} from "../actionTypes/authActionTypes";

// Headers
type Config = {
  headers: Record<string, string>;
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

      const token = response.data.access_token;
      const usertoken = response.data.user_token;
      
      setToken(token);
      setUserToken(usertoken);

      dispatch<IAuthSuccess>({
        type: ActionType.AUTH_SUCCESS,
        payload: response.data,
      });
    } catch (err: any) {
      ToastMessage(err.response);
      dispatch<IAuthFail>({
        type: ActionType.AUTH_FAIL,
      });
    }
  };

  export const UserProfile = (): any => async (dispatch: Dispatch<Action>) => {
    dispatch<IAuthStart>({ type: ActionType.AUTH_START });
  
    try {
      const response: AxiosResponse<Auth> = await axios.get(`/auth/user-profile`);
  
      dispatch<IAuthSuccess>({
        type: ActionType.AUTH_SUCCESS,
        payload: response.data,
      });
    } catch (err: any) {
      ToastMessage(err.response);
      dispatch<IAuthFail>({
        type: ActionType.AUTH_FAIL,
      });
    }
  };

  // Logout action
export const logout = (navigate: any): any => {
    
    return (dispatch: Dispatch<Action>) => {
      removeToken();
      removeUserToken();
      navigate('/');

      dispatch<IAuthLogout>({
        type: ActionType.AUTH_LOGOUT,
        payload: ''
      });
    };
  };
