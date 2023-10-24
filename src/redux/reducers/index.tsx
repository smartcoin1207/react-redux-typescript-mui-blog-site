import { combineReducers } from 'redux';

import { AlertReducer, IAlertState as AlertState } from './AlertReducer';
import { AuthReducer, IAuthState as AuthState } from './authReducer';
import { CompanyReducer, ICompaniesState as CompaniesState } from './companyReducer';
import { UserReducer, IUserState } from './userReducer';
    
interface RootStateType {
    readonly alert: AlertState;
    readonly auth: AuthState;
    readonly companies: CompaniesState;
    users: IUserState;
}

const rootReducer = combineReducers<RootStateType>({
    alert: AlertReducer,
    auth: AuthReducer,
    companies: CompanyReducer,
    users: UserReducer
});

export default rootReducer;