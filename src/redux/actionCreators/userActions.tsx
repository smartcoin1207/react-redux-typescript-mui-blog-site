import { Dispatch } from "redux";
import Cookies from "universal-cookie";
import { AxiosResponse } from "axios";
import axios from "../../services/axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
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
import { ToastMessage } from "../../util/toast";

// Headers
type Config = {
  headers: Record<string, string>;
};

const saveToken = (token: string) => {
  const cookies = new Cookies();
  cookies.set("token", token, { path: "/" });
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

export const AddUser =
  (navigate: any,user: any): any =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const response: AxiosResponse<Auth> = await axios.post(
        `/auth/user/create`,
        user
      );

      dispatch<IAuthSuccess>({
        type: ActionType.AUTH_SUCCESS,
        payload: response.data,
      });
      navigate("/user/index");
      console.log(response);
      ToastMessage(response);
    } catch (err: any) {
      ToastMessage(err.response);
      // dispatch<IAuthFail>({
      //   type: ActionType.AUTH_FAIL,
      // });
    }
  };

  export const GetUsers =
  (navigate: any): any =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const response: AxiosResponse<Auth> = await axios.get(
        `/auth/user/index`,
      );

      // dispatch<IAuthSuccess>({
      //   type: ActionType.AUTH_SUCCESS,
      //   payload: response.data,
      // });

      navigate("/user/index");
      console.log(response);
      ToastMessage(response);
    } catch (err: any) {
      ToastMessage(err.response);
      dispatch<IAuthFail>({
        type: ActionType.AUTH_FAIL,
      });
    }
  };
