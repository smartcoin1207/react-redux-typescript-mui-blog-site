import { IAuth as Auth } from '../../models/auth';

export enum ActionType {
    GET_ALL_GROUPS =  'GET_ALL_GROUPS',
    GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES',
    GET_CURRENT_GROUP = 'GET_CURRENT_GROUP',
    GET_CURRENT_CATEGORY = 'GET_CURRENT_CATEGORY',
    GET_CURRENT_GENRE = 'GET_CURRENT_GENRE',
    GET_CURRENT_BLOG = 'GET_CURRENT_BLOG',
    SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
}

export interface IAllGroups {
    type: ActionType.GET_ALL_GROUPS,
    payload: any
}

export interface IAllCategories {
    type: ActionType.GET_ALL_CATEGORIES,
    payload : any
}

export interface IGetCurrentGroup {
    type: ActionType.GET_CURRENT_GROUP,
    payload : any
}

export interface IGetCurrentCategory {
    type: ActionType.GET_CURRENT_CATEGORY,
    payload : any
}


export interface IGetCurrentGenre {
    type: ActionType.GET_CURRENT_GENRE,
    payload : any
}

export interface IGetCurrentBlog {
    type: ActionType.GET_CURRENT_BLOG,
    payload : any
}

export interface ISetCurrentPage {
    type: ActionType.SET_CURRENT_PAGE,
    payload : any
}

export type Action = 
    | IAllGroups
    | IAllCategories
    | IGetCurrentGroup
    | IGetCurrentCategory
    | IGetCurrentGenre
    | IGetCurrentBlog
    | ISetCurrentPage
 
