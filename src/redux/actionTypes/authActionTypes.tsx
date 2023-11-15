import { IAuth as Auth, IQrScan } from '../../models/auth';

export enum ActionType {
    AUTH_START = 'AUTH_START',
    AUTH_SUCCESS = 'AUTH_SUCCESS',
    AUTH_FAIL = 'AUTH_FAIL',
    AUTH_LOGOUT = 'AUTH_LOGOUT',
    AUTH_QR_SCAN = 'AUTH_QR_SCAN',
    AUTH_OPT = 'AUTH_OPT',

}

export interface IAuthStart {
    type: ActionType.AUTH_START;
}
export interface IAuthSuccess {
    type: ActionType.AUTH_SUCCESS;
    payload: Auth;
}
export interface IAuthFail {
    type: ActionType.AUTH_FAIL;
    // payload?: any | null;
}

export interface IAuthLogout {
    type: ActionType.AUTH_LOGOUT;
    payload: string | null;
}

export interface IAuthQrScan {
    type: ActionType.AUTH_QR_SCAN;
    payload: IQrScan
}

export interface IAuthOPT {
    type: ActionType.AUTH_OPT;
    payload: IQrScan;
}

export type Action =
    | IAuthStart
    | IAuthSuccess
    | IAuthFail
    | IAuthLogout
    | IAuthQrScan
    | IAuthOPT
