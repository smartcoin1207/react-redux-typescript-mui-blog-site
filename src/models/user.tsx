export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    active: boolean;
}

export interface IUser1 {
    id: number, 
    user_id: string,
    password: string,
    email: string,
    name: string,
    read_name: string,
    role_id: string,
    group_id: string
}