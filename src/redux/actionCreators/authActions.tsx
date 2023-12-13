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
  IAuthOPT,
  IAuthQrScan,
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
      const response: AxiosResponse<any> = await axios.post(
        `/auth/login`,
        body,
        config
      );

      const token = response.data.access_token;
      const usertoken = response.data.user_token;

      const {login_status} = response.data;
      
      if(login_status == 'LOGGED') {
        setToken(token);
        setUserToken(usertoken);
  
        dispatch<IAuthSuccess>({
          type: ActionType.AUTH_SUCCESS,
          payload: response.data,
        });
      } 
      else if(login_status == 'QRSCAN') {
        dispatch<IAuthQrScan>({
          type: ActionType.AUTH_QR_SCAN,
          payload: response.data
        })
      } else if(login_status == 'OTP') {
        dispatch<IAuthOPT>({
          type: ActionType.AUTH_OPT,
          payload: response.data
        })
      }

    } catch (err: any) {
      ToastMessage(err.response);
      dispatch<IAuthFail>({
        type: ActionType.AUTH_FAIL,
      });
    }
  };

  export const AuthOTPLogin =
  (otp: string, user_id: string, password: string): any =>
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
      otp,
      user_id,
      password
    });
    try {
      const response: AxiosResponse<any> = await axios.post(
        `/auth/loginotp`,
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
      // removeToken();
      // removeUserToken();

      dispatch<IAuthLogout>({
        type: ActionType.AUTH_LOGOUT,
        payload: ''
      });

    };
  };
