import { IAuth as Auth } from '../../models/auth';

export enum ActionType {
    GET_USER_PROFILE_START = 'GET_USER_PROFILE_START',
    GET_USER_PROFILE_SUCCESS = 'GET_USER_PROFILE_SUCCESS',
    GET_USER_PROFILE_FAIL = 'GET_USER_PROFILE_FAIL',

    CREATE_USER_START = 'CREATE_USER_START',
    CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS',
    CREATE_USER_FAIL = 'CREATE_USER_FAIL',

    GET_USERS_START = 'GET_USERS_START',
    GET_USERS_SUCCESS = 'CREATE_USERS_SUCCESS',
    GET_USERS_FAIL = 'CREATE_USERS_FAIL',

}

export interface IUserProfileStart {
    type: ActionType.GET_USER_PROFILE_START;
}
export interface IUserProfileSuccess {
    type: ActionType.GET_USER_PROFILE_SUCCESS,
    payload: Auth
}
export interface IUserProfileFail {
    type: ActionType.GET_USER_PROFILE_FAIL,
    payload: string | null
}

export interface ICreateUserStart {
    type: ActionType.CREATE_USER_START;
}
export interface ICreateUserSuccess {
    type: ActionType.CREATE_USER_SUCCESS,
    payload: any
}
export interface ICreateUserFail {
    type: ActionType.CREATE_USER_FAIL,
    payload: string | null
}

export interface IGetUserStart {
    type: ActionType.GET_USERS_START;
}
export interface IGetUserSuccess {
    type: ActionType.GET_USERS_SUCCESS,
    payload: any
}
export interface IGetUserFail {
    type: ActionType.GET_USERS_FAIL,
    payload: string | null
}

export type Action = 
    | IUserProfileStart
    | IUserProfileSuccess
    | IUserProfileFail
    | ICreateUserStart 
    | ICreateUserSuccess
    | ICreateUserFail
    | IGetUserStart 
    | IGetUserSuccess
    | IGetUserFail

