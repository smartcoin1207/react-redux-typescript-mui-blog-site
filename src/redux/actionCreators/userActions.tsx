import { Dispatch } from "redux";
import Cookies from "universal-cookie";
import { AxiosResponse } from "axios";
import axios from "../../services/axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { IAuth as Auth, IBasicData } from "../../models/auth";
import { ThunkResult } from "./actionResultTypes";

import {
  Action,
  ActionType,
  IUserProfileStart,
  IUserProfileSuccess,
  IUserProfileFail,
  ICreateUserStart,
  ICreateUserSuccess,
  ICreateUserFail,
  IGetUserStart,
  IGetUserSuccess,
  IGetUserFail,
  IGetBasicCategoriesSuccess,
  IGetAllGroups,
  IGetAllCategories,
  IGetAllGenres,
  IGetBlogs,
  IGetBlog,
} from "../actionTypes/userActionTypes";

import { ToastMessage } from "../../util/toast";

type Config = {
  headers: Record<string, string>;
};

export const getData = (): any => async (dispatch: Dispatch<Action>) => {
  try {
    const response: AxiosResponse<IBasicData> = await axios.get(
      `/auth/user/categories`
    );

    dispatch<IGetBasicCategoriesSuccess>({
      type: ActionType.GET_BASIC_CATEGORIES_SUCCESS,
      payload: response.data,
    });
  } catch (error: any) {
    ToastMessage(error.response);
  } 
};

export const getAllGroups = (): any => async (dispatch: Dispatch<Action>)  => {
  try {
    const response: AxiosResponse<IBasicData> = await axios.get(
      `/auth/user/group/getall`
    );

    dispatch<IGetAllGroups>({
      type: ActionType.GET_ALL_GROUPS,
      payload: response.data,
    });
  } catch (error : any) {
    
    ToastMessage(error.response);
  }
}


export const getAllCategories = (): any => async (dispatch: Dispatch<Action>)  => {
  try {
    const response: AxiosResponse<any> = await axios.get(
      `/auth/category/all`
    );

    dispatch<IGetAllCategories>({
      type: ActionType.GET_ALL_CATEGORIES,
      payload: response.data,
    });
  } catch (error : any) {
    ToastMessage(error.response);
  }
}


export const getAllGenres = (): any => async (dispatch: Dispatch<Action>)  => {
  try {
    const response: AxiosResponse<any> = await axios.get(
      `/auth/genre/all`
    );

    dispatch<IGetAllGenres>({
      type: ActionType.GET_ALL_GENRES,
      payload: response.data,
    });
  } catch (error : any) {
    ToastMessage(error.response);
  }
}



export const GetBlogs = (genre_id: string): any => async (dispatch: Dispatch<Action>)  => {
  try {
    const response: AxiosResponse<any> = await axios.get(
      `/auth/blog/${genre_id}`,
      
    );

    // console.log(response.data)

    dispatch<IGetBlogs>({
      type: ActionType.GET_BLOGS,
      payload: response.data,
    });
  } catch (error : any) {
    ToastMessage(error.response);
  }
}

export const GetBlog = (id: any): any => async (dispatch: Dispatch<Action>)  => {
  
  try {
    const response: AxiosResponse<any> = await axios.get(
      `/auth/blog/show/${id}`,
      
    );

    dispatch<IGetBlog>({
      type: ActionType.GET_BLOG,
      payload: response.data,
    });
  } catch (error : any) {
    ToastMessage(error.response);
  }
}

export const AddUser =
  (navigate: any, user: any): any =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const config: Config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response: AxiosResponse<Auth> = await axios.post(
        `/auth/user/create`,
        user,
        config
      );

      dispatch<ICreateUserSuccess>({
        type: ActionType.CREATE_USER_SUCCESS,
        payload: response.data,
      });

      navigate("/user/index");
    } catch (err: any) {
      dispatch<ICreateUserFail>({
        type: ActionType.CREATE_USER_FAIL,
      });
    }
  };

  export const AddLeader =
  (navigate: any, user: any): any =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const config: Config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response: AxiosResponse<Auth> = await axios.post(
        `/auth/leader/create`,
        user,
        config
      );

      dispatch<ICreateUserSuccess>({
        type: ActionType.CREATE_USER_SUCCESS,
        payload: response.data,
      });

      navigate("/user/index");  
      ToastMessage(response);
    } catch (err: any) {
      ToastMessage(err.response);
      dispatch<ICreateUserFail>({
        type: ActionType.CREATE_USER_FAIL,
      });
    }
  };

export const GetUsers =
  (navigate: any): any =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const response: AxiosResponse<any> = await axios.get(`/auth/user/index`);

      dispatch<IGetUserSuccess>({
        type: ActionType.GET_USERS_SUCCESS,
        payload: response.data,
      });
      ToastMessage(response);
    } catch (err: any) {
      ToastMessage(err.response);
      dispatch<IGetUserFail>({
        type: ActionType.GET_USERS_FAIL,
      });
    }
  };

  export const AddStep = (navigate: any, step: any): any =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const config: Config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response: AxiosResponse<any> = await axios.post(
        `/auth/category/create`,
        step,
        config
      );

      // navigate("/step/index");  
      ToastMessage(response);
    } catch (err: any) {
      ToastMessage(err.response);

    }
  };


  export const AddGenre = (navigate: any, step: any): any =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const config: Config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response: AxiosResponse<any> = await axios.post(
        `/auth/genre/create`,
        step,
        config
      );

      // navigate("/genre/index");  
      ToastMessage(response);
    } catch (err: any) {
      ToastMessage(err.response);

    }
  };


  export const AddBlog = (navigate: any, blog: any): any =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const config: Config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response: AxiosResponse<any> = await axios.post(
        `/auth/blog/create`,
        blog,
        config
      );

      // navigate("/blog/index");  
      ToastMessage(response);
    } catch (err: any) {
      ToastMessage(err.response);

    }
  };