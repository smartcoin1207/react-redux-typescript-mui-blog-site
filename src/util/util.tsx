import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";

interface IUser {
    name: string,
    user_id?: string | null,
    role_id: string ,
  }

export const setToken = (token: string):any => {
    const cookies = new Cookies();
    cookies.set('token', token, {path: '/'}); // token is the
}

export const getToken = (): any => {
    const cookies = new Cookies();
    const token = cookies.get('token');
    return token;
}

export const removeToken = () => {
    const cookies = new Cookies();
    cookies.remove('token');
}

export const setUserToken = (usertoken: string):any => {
    const cookies = new Cookies();
    cookies.set('usertoken', usertoken, {path: '/'}); // token is the
}

export const getUserToken = (): any => {
    const cookies = new Cookies();
    const usertoken = cookies.get('usertoken');
    return usertoken;
}

export const removeUserToken = () => {
    const cookies = new Cookies();
    cookies.remove('usertoken');
}

export const getUserFromToken = (): any => {
    const token = getUserToken();
    const user = token ? jwtDecode(token) : null;
    return user;
}