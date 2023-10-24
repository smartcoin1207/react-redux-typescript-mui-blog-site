import { ICategory } from "./category";
import { IUser } from "./user";

export interface IAuth {
    access_token: string,
    user_token: string,
    authToken : string ,
    isPasswordChanged: boolean,
    user? : IUser;
    error? : string | null;
}

export interface IBasicData {
    common_group_categories : ICategory[] | null
    mygroup_categories : ICategory[] | null
}