import { Reducer } from 'redux';

import { IAuth as Auth } from '../../models/auth';
import { IUser } from '../../models/user';
import { Action, ActionType } from '../actionTypes/userActionTypes';


export interface IAuthState {
    authToken : string ,
    isPasswordChanged: boolean,
    user : IUser | undefined | null;
    loading: boolean;
    error? : string | null;
}

const initialState = {
    authToken : "" ,
    isPasswordChanged: false,
    user : null , 
    loading: false,
    error : null
}

export const BlogReducer: Reducer<IAuthState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.GET_USER_PROFILE_START:
            return { ...state, loading: true };

        case ActionType.GET_USER_PROFILE_SUCCESS:
            const auth: Auth = action.payload
            return {
                ...state,
                authToken : 'loggedin' , 
                user : auth.user ,
                error : null , 
                loading: false
            };
        case ActionType.GET_USER_PROFILE_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };


        default:
            return state;
    }
};