import { Reducer } from 'redux';

import { IAuth as Auth } from '../../models/auth';
import { IUser } from '../../models/user';
import { Action, ActionType } from '../actionTypes/authActionTypes';
    

export interface IAuthState {
    authToken : boolean ,
    isPasswordChanged: boolean,
    user : IUser | undefined | null;
    loading: boolean;
    error? : any | null;
}

const initialState = {
    authToken : false ,
    isPasswordChanged: false,
    user : null , 
    loading: false,
    error : null
}

export const AuthReducer: Reducer<IAuthState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.AUTH_START:
            return { ...state, loading: true };

        case ActionType.AUTH_SUCCESS:
            const auth: Auth = action.payload
            return {
                ...state,
                authToken : true , 
                user : auth.user ,
                error : null , 
                loading: false
            };
        case ActionType.AUTH_FAIL:
            return {
                ...state,
                user: null,
                loading: false
            };
        case ActionType.AUTH_LOGOUT:
            return {
                ...state,
                user: null,
                loading: false,
                authToken: false
            }

        default:
            return state;
    }
};