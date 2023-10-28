import { Dispatch } from "redux";
import Cookies from "universal-cookie";
import { AxiosResponse } from "axios";
import axios from "../../services/axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { IAuth as Auth, IBasicData } from "../../models/auth";

import {
  Action,
  ActionType,
  IAllCategories,
  IGetCurrentGroup,
  IGetCurrentCategory,
  IGetCurrentGenre,
  IGetCurrentBlog,
  ISetCurrentPage,
} from "../actionTypes/blogActionTypes";

import { ToastMessage } from "../../util/toast";

type Config = {
  headers: Record<string, string>;
};

export const setCurrentPage  = 
  (page: string): any => async (dispatch: Dispatch<Action>) => {
      dispatch<ISetCurrentPage>({
        type: ActionType.SET_CURRENT_PAGE,
        payload: page
      });
  };

export const getAllCategories =
  (): any => async (dispatch: Dispatch<Action>) => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `/auth/category/allcategories`
      );

      dispatch<IAllCategories>({
        type: ActionType.GET_ALL_CATEGORIES,
        payload: response.data,
      });
    } catch (error: any) {
      ToastMessage(error.response);
    }
  };

export const getCurrentGroup =
  (id: any): any =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `/auth/category/currentgroup/${id}`
      );

      dispatch<IGetCurrentGroup>({
        type: ActionType.GET_CURRENT_GROUP,
        payload: response.data,
      });
    } catch (error: any) {
      ToastMessage(error.response);
    }
  };

export const getCurrentCategory =
  (id: any): any =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `/auth/genre/currentcategory/${id}`
      );

      dispatch<IGetCurrentCategory>({
        type: ActionType.GET_CURRENT_CATEGORY,
        payload: response.data,
      });
    } catch (error: any) {
      ToastMessage(error.response);
    }
  };

export const getCurrentGenre =
  (id: any): any =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `/auth/blog/currentgenre/${id}`
      );

      dispatch<IGetCurrentGenre>({
        type: ActionType.GET_CURRENT_GENRE,
        payload: response.data,
      });
    } catch (error: any) {
      ToastMessage(error.response);
    }
  };

export const AddStep =
  (navigate: any, step: any): any =>
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

      dispatch<IGetCurrentGroup>({
        type: ActionType.GET_CURRENT_GROUP,
        payload: response.data.current_group,
      });
      // navigate("/step/index");
      ToastMessage(response);
    } catch (err: any) {
      ToastMessage(err.response);
    }
  };

  export const EditStep =
  (navigate: any, step: any, id: any): any =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const config: Config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response: AxiosResponse<any> = await axios.post(
        `/auth/category/update/${id}`,
        step,
        config
      );

      dispatch<IGetCurrentGroup>({
        type: ActionType.GET_CURRENT_GROUP,
        payload: response.data.current_group,
      });
      // navigate("/step/index");
      ToastMessage(response);
    } catch (err: any) {
      ToastMessage(err.response);
    }
  };

  export const DeleteStep =
  (id: any): any =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const config: Config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response: AxiosResponse<any> = await axios.post(
        `/auth/category/delete/${id}`,
        config
      );

      dispatch<IGetCurrentGroup>({
        type: ActionType.GET_CURRENT_GROUP,
        payload: response.data.current_group,
      });
      // navigate("/step/index");
      ToastMessage(response);
    } catch (err: any) {
      ToastMessage(err.response);
    }
  };

export const AddGenre =
(navigate: any, step: any): any =>
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

    dispatch<IGetCurrentCategory>({
      type: ActionType.GET_CURRENT_CATEGORY,
      payload: response.data.current_category,
    });
    // navigate("/step/index");
    ToastMessage(response);
  } catch (err: any) {
    ToastMessage(err.response);
  }
};

export const EditGenre =
(navigate: any, step: any, id: any): any =>
async (dispatch: Dispatch<Action>) => {
  try {
    const config: Config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response: AxiosResponse<any> = await axios.post(
      `/auth/genre/update/${id}`,
      step,
      config
    );

    dispatch<IGetCurrentCategory>({
      type: ActionType.GET_CURRENT_CATEGORY,
      payload: response.data.current_category,
    });
    // navigate("/step/index");
    ToastMessage(response);
  } catch (err: any) {
    ToastMessage(err.response);
  }
};

export const DeleteGenre =
(id: any): any =>
async (dispatch: Dispatch<Action>) => {
  try {
    const config: Config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response: AxiosResponse<any> = await axios.post(
      `/auth/genre/delete/${id}`,
      config
    );

    dispatch<IGetCurrentCategory>({
      type: ActionType.GET_CURRENT_CATEGORY,
      payload: response.data.current_category   ,
    });
    // navigate("/step/index");
    ToastMessage(response);
  } catch (err: any) {
    ToastMessage(err.response);
  }
};


export const GetBlog =
(navigate: any, id: any): any =>
async (dispatch: Dispatch<Action>) => {
  try {
    const config: Config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response: AxiosResponse<any> = await axios.get(
      `/auth/blog/show/${id}`,
      config
    );

    dispatch<IGetCurrentBlog>({
        type: ActionType.GET_CURRENT_BLOG,
        payload: response.data,
      });

    // if(response.status <300) {
    //     navigate(`/blogs/blog/edit/${id}`);
    // }
  } catch (err: any) {
    ToastMessage(err.response);
  }
};


export const AddBlog =
(navigate: any, blog: any): any =>
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
    if(response.status < 300) {
        navigate(`/blog/blogs/${blog?.genre_id}`);
    }
    ToastMessage(response);
  } catch (err: any) {
    ToastMessage(err.response);
  }
};

export const UpdateBlog =
(navigate: any, blog: any, id: any): any =>
async (dispatch: Dispatch<Action>) => {
  try {
    const config: Config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response: AxiosResponse<any> = await axios.post(
      `/auth/blog/update/${id}`,
      blog,
      config
    );

    if(response.status <300) {
        navigate(`/blog/show/${id}`);
    }
    ToastMessage(response);
  } catch (err: any) {
    ToastMessage(err.response);
  }
};

export const DeleteBlog =
(id: any): any =>
async (dispatch: Dispatch<Action>) => {
  try {
    const config: Config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response: AxiosResponse<any> = await axios.post(
      `/auth/blog/delete/${id}`,
      config
    );

    dispatch<IGetCurrentGenre>({
      type: ActionType.GET_CURRENT_GENRE,
      payload: response.data.current_genre
    });
    ToastMessage(response);
  } catch (err: any) {
    ToastMessage(err.response);
  }
};
