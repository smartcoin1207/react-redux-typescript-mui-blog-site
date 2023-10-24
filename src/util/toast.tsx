import React from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigation } from "./navigation_helper";
import { removeToken, removeUserToken } from './util';
import Cookies from "universal-cookie";

// import { Redirect } from 'react-router-dom';
const showSuccessToast = (message: string) => {
  toast.success(message, {
    autoClose: 1000,
  });
};

const showWarningToast = (message: string) => {
  toast.warn(message, {
    autoClose: 1000,
  });
};

const showErrorToast = (message: string) => {
  // let msg = message == "Unauthenticated." ? "無許可." : message;
  toast.error(message, {
    autoClose: 1000 ,
  });
};

export const ToastMessage = (response: any) => {
console.log(response)
//   const { navigateTo } = useNavigation();

//   const navigate = useNavigate();
  const { status } = response;
  const message = response.data.message;
  if (status >= 200 && status < 300) {
    showSuccessToast(message);
  } else if (status >= 300 && status < 400) {
    showWarningToast(message);
  } else if (status >= 400 && status < 500) {
    // navigateTo("/");
    if(status == 401 && message == "Unauthenticated.") {
      const cookies = new Cookies();
      cookies.remove('token');
      cookies.remove('usertoken');
      removeToken();
      removeUserToken();
      // alert()
    }
    showErrorToast(message);
  }

};
