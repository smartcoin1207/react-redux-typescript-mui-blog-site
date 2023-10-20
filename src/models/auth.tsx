import { IUser } from "./user";

export interface IAuth {
    access_token: string,
    user_token: string,
    authToken : string ,
    isPasswordChanged: boolean,
    user? : IUser;
    error? : string | null;
}