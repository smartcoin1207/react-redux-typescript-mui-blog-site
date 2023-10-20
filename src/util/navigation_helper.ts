import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const useNavigation = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return { navigateTo };
};

// export const useCookieManager = () => {
//   const [cookies, setCookie, removeCookie] = useCookies();

//   const getCookie = (name) => {
//     return cookies[name];
//   };

//   const setCookieValue = (name, value) => {
//     setCookie(name, value);
//   };

//   const removeCookieValue = (name) => {
//     removeCookie(name);
//   };

//   return { getCookie, setCookieValue, removeCookieValue };
// };