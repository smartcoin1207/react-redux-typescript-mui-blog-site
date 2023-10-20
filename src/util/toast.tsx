import React from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigation } from "./navigation_helper";
// import { Redirect } from 'react-router-dom';
const showSuccessToast = (message: string) => {
  toast.success(message, {
    autoClose: 1500,
  });
};

const showWarningToast = (message: string) => {
  toast.warn(message, {
    autoClose: 1500,
  });
};

const showErrorToast = (message: string) => {
  let msg = message == "Unauthenticated." ? "無許可." : message;
  toast.error(msg, {
    autoClose: 1500,
  });
};

export const ToastMessage = (response: any) => {
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
    showErrorToast(message);
  }

};
