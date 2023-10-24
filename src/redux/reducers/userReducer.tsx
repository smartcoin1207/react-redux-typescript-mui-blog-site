import { Reducer } from "redux";

import { IAuth as Auth, IBasicData } from "../../models/auth";
import { IUser } from "../../models/user";
import { Action, ActionType } from "../actionTypes/userActionTypes";
import { iteratee } from "lodash";

export interface IUserState {
  basicCategories: IBasicData | null;
  groups: any[] | null;
  loading: boolean;
  categories: any | null;
  genres: any | null;
  users: any | null;
  blogs: any | null,
  blog: any | null,
}

const initialState = {
  basicCategories: {
    common_group_categories: [{ name: "c1", id: "1", group_id: '' }],
    mygroup_categories: [{ name: "c1", id: "1", group_id: '' }],
  },
  groups: [],
  categories: null,
  genres: null,
  users: null,
  blogs: null,
  blog: null,
  loading: false,
};

export const UserReducer: Reducer<IUserState, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionType.GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case ActionType.GET_BASIC_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        basicCategories: action.payload,
      };
    case ActionType.GET_ALL_GROUPS:
      return {
        ...state,
        loading: false,
        groups: action.payload,
      };

    case ActionType.GET_ALL_CATEGORIES:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };

    case ActionType.GET_ALL_GENRES:
      return {
        ...state,
        loading: false,
        genres: action.payload,
      };

    case ActionType.GET_BLOGS:
      return {
        ...state,
        loading: false,
        blogs: action.payload
      };

      case ActionType.GET_BLOG:
        return {
          ...state,
          loading: false,
          blog: action.payload
        };

    default:
      return state;
  }
};
