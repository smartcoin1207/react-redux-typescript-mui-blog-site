import { IAuth as Auth } from '../../models/auth';

export enum ActionType {
    GET_USER_PROFILE_START = 'GET_USER_PROFILE_START',
    GET_USER_PROFILE_SUCCESS = 'GET_USER_PROFILE_SUCCESS',
    GET_USER_PROFILE_FAIL = 'GET_USER_PROFILE_FAIL',

    CREATE_USER_START = 'CREATE_USER_START',
    CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS',
    CREATE_USER_FAIL = 'CREATE_USER_FAIL',

    GET_USERS_START = 'GET_USERS_START',
    GET_USERS_SUCCESS = 'GET_USERS_SUCCESS',
    GET_USERS_FAIL = 'CREATE_USERS_FAIL',

    GET_BASIC_CATEGORIES_SUCCESS = 'GET_BASIC_CATEGORIES_SUCCESS',
    GET_ALL_GROUPS = 'GET_ALL_GROUPS',
    GET_ALL_CATEGORIES  = 'GET_ALL_CATEGORIES',
    GET_ALL_GENRES  = 'GET_ALL_GENRES',
    GET_BLOGS  = 'GET_BLOGS',
    GET_BLOG  = 'GET_BLOG',
    GET_NEW_BLOGS  = 'GET_NEW_BLOGS',
    GET_SEARCH_BLOGS  = 'GET_SEARCH_BLOGS',
    GET_USER_BY_ID = 'GET_USER_BY_ID'

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
    // payload: string | null
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
    // payload: string | null
}

export interface IGetBasicCategoriesSuccess {
    type: ActionType.GET_BASIC_CATEGORIES_SUCCESS,
    payload: any
}

export interface IGetAllGroups {
    type: ActionType.GET_ALL_GROUPS,
    payload: any
}

export interface IGetAllCategories {
    type: ActionType.GET_ALL_CATEGORIES,
    payload: any
}

export interface IGetAllGenres {
    type: ActionType.GET_ALL_GENRES,
    payload: any
}

export interface IGetBlogs {
    type: ActionType.GET_BLOGS,
    payload: any
}

export interface IGetBlog {
    type: ActionType.GET_BLOG,
    payload: any
}

export interface IGetNewBlog {
    type: ActionType.GET_NEW_BLOGS,
    payload: any
}

export interface ISearchBlogs {
    type: ActionType.GET_SEARCH_BLOGS,
    payload: any
}

export interface IGetUserById {
    type: ActionType.GET_USER_BY_ID,
    payload: any
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
    | IGetBasicCategoriesSuccess
    | IGetAllGroups
    | IGetAllCategories
    | IGetAllGenres
    | IGetBlogs
    | IGetBlog
    | IGetNewBlog
    | ISearchBlogs
    | IGetUserById

