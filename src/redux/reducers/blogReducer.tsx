import { Reducer } from "redux";

import { Action, ActionType } from "../actionTypes/blogActionTypes";

export interface IBlogState {
  all_groups: any[] | null;
  all_categories: any | null;
  current_group: any | null;
  current_category: any | null;
  current_genre: any | null;
  current_blog: any | null;
  current_page: string | null;
  loading: boolean;
}

const initialState = {
  all_groups: null,
  all_categories: null,
  current_group: null,
  current_category: null,
  current_genre: null,
  current_blog: null,
  current_page: null,
  loading: false,
};

export const BlogReducer: Reducer<IBlogState, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionType.GET_ALL_GROUPS:
      return {
        ...state,
        all_groups: action.payload,
      };

    case ActionType.GET_ALL_CATEGORIES:
      return {
        ...state,
        all_groups: action.payload.groups,
        all_categories: action.payload.categories,
      };

    case ActionType.GET_CURRENT_GROUP:
      return {
        ...state,
        current_group: action.payload,
      };

    case ActionType.GET_CURRENT_CATEGORY:
      return {
        ...state,
        current_category: action.payload,
      };

    case ActionType.GET_CURRENT_GENRE:
      return {
        ...state,
        current_genre: action.payload,
      };

    case ActionType.GET_CURRENT_BLOG:
      return {
        ...state,
        current_blog: action.payload,
      };

    case ActionType.SET_CURRENT_PAGE:
      return {
        ...state,
        current_page: action.payload,
      };

    default:
      return state;
  }
};
