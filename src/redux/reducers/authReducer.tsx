import { Reducer } from "redux";

import { IAuth as Auth, IQrScan } from "../../models/auth";
import { IUser } from "../../models/user";
import {
  Action,
  ActionType,
  IAuthQrScan,
} from "../actionTypes/authActionTypes";
import { removeToken, removeUserToken } from "../../util/util";

export interface IAuthState {
  login_status: string;
  authToken: boolean;
  isPasswordChanged: boolean;
  user: IUser | undefined | null;
  loading: boolean;
  error?: any | null;
  qrScan? : IQrScan | null

}

const initialState = {
  login_status: "",
  authToken: false,
  isPasswordChanged: false,
  user: null,
  loading: false,
  error: null,
  qrScan: null
};

export const AuthReducer: Reducer<IAuthState, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionType.AUTH_START:
      return { ...state, loading: true };

    case ActionType.AUTH_SUCCESS:
      const auth: Auth = action.payload;
      return {
        ...state,
        login_status: "LOGGED",
        authToken: true,
        user: auth.user,
        error: null,
        loading: false,
      };

    case ActionType.AUTH_QR_SCAN:
      const scan: IQrScan = action.payload;
      return {
        ...state,
        user: null,
        loading: false,
        login_status: "QRSCAN",
        qrScan: scan
      };

    case ActionType.AUTH_OPT:
      const scan1: IQrScan = action.payload;

      return {
        ...state,
        login_status: "OTP",
        qrScan: scan1,
        user: null,
        loading: false,
      };

    case ActionType.AUTH_FAIL:
      return {
        ...state,
        user: null,
        loading: false,
      };

    case ActionType.AUTH_LOGOUT:  
    removeToken();
    removeUserToken();
      return {
        ...state,
        user: null,
        loading: false,
        authToken: false,
        login_status: '',
        qrScan: null,
      };

    default:
      return state;
  }
};
