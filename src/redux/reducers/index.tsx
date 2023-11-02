import { combineReducers } from 'redux';

import { AlertReducer, IAlertState as AlertState } from './AlertReducer';
import { AuthReducer, IAuthState as AuthState } from './authReducer';
import { CompanyReducer, ICompaniesState as CompaniesState } from './companyReducer';
import { UserReducer, IUserState } from './userReducer';
import { BlogReducer, IBlogState } from './blogReducer';
    
interface RootStateType {
    readonly alert: AlertState;
    readonly auth: AuthState;
    readonly companies: CompaniesState;
    readonly users: IUserState;
    readonly blog : IBlogState;
}

const rootReducer = combineReducers<RootStateType>({
    alert: AlertReducer,
    auth: AuthReducer,
    companies: CompanyReducer,
    users: UserReducer,
    blog: BlogReducer
});

export default rootReducer;