// import { Dashboard } from "@mui/icons-material";
import async from "../components/Async";
import BlogList from "../pages/blogs/BlogList";
import CreateBlog from "../pages/blogs/CreateBlog";
import EditBlog from "../pages/blogs/EditBlog";
import CreateGenre from "../pages/genres/CreateGenre";
import EditGenre from "../pages/genres/EditGenre";
import GenreList from "../pages/genres/GenreList";
import CreateStep from "../pages/steps/CreateStep";
import EditStep from "../pages/steps/EditStep";
import StepList from "../pages/steps/StepList";
import CreateUser from "../pages/users/CreateUser";
import EditUser from "../pages/users/EditUser";
import UserList from "../pages/users/UserList";
import { IRoute } from "../types/RouteType";

const Dashboard = async(() => import("../pages/dashboard/Dashboard"));
const About = async(() => import("../pages/About"));
const Config = async(() => import("../pages/config"));
const Company = async(() => import("../pages/baseInfo/company"));
const Department = async(() => import("../pages/baseInfo/department"));
const Employee = async(() => import("../pages/baseInfo/employee"));
const JobPosition = async(() => import("../pages/baseInfo/jobPosition"));

const Project = async(() => import("../pages/baseInfo/project"));
const Meal = async(() => import("../pages/restaurant/admin/meal"));
const MealsSetting_Monthly = async(
  () => import("../pages/restaurant/admin/mealsSetting_Monthly")
);
const MealsSelection_CurrentMonth = async(
  () => import("../pages/restaurant/users/mealsSelection_CurrentMonth")
);
const MealsSelection_NextMonth = async(
  () => import("../pages/restaurant/users/mealsSelection_NextMonth")
);

const SignIn = async(() => import("../pages/security/authentication/signIn"));
const SignUp = async(() => import("../pages/security/authentication/signUp"));
const ChangePassword = async(
  () => import("../pages/security/authentication/changePassword")
);
const ForgetPassword = async(
  () => import("../pages/security/authentication/forgetPassword")
);
const Page404 = async(() => import("../pages/security/authentication/Page404"));

const Group = async(() => import("../pages/security/authorization/group"));
const GroupPermission = async(
  () => import("../pages/security/authorization/groupPermission")
);
const Permission = async(
  () => import("../pages/security/authorization/permission")
);
const User = async(() => import("../pages/security/authorization/user"));
const UserGroup = async(
  () => import("../pages/security/authorization/userGroup")
);

export const routes: Array<IRoute> = [
  {
    key: "dashboard-route",
    title: "Dashboard",
    path: "/",
    enabled: true,
    component: Dashboard,
  },
  {
    key: "about-route",
    title: "About",
    path: "/about",
    enabled: true,
    component: About,
  },
  {
    key: "config-route",
    title: "Config",
    path: "/config",
    enabled: true,
    component: Config,
  },

  //------------------User Management------------------
  {
    key: "user-list-route",
    title: "ユーザーリスト",
    path: "user/index",
    enabled: true,
    component: UserList,
  },
  {
    key: "user-create-route",
    title: "ユーザーを追加する",
    path: "user/create",
    enabled: true,
    component: CreateUser,
  },
  {
    key: "user-edit-route",
    title: "ユーザーの編集",
    path: "user/edit/{id}",
    enabled: true,
    component: EditUser,
  },

  //------------------Step Management------------------
  {
    key: "step-list-route",
    title: "ステップリスト",
    path: "step/index",
    enabled: true,
    component: StepList,
  },
  {
    key: "step-create-route",
    title: "ステップの作成",
    path: "step/create",
    enabled: true,
    component: CreateStep,
  },
  {
    key: "step-edit-route",
    title: "ステップを編集する",
    path: "step/edit/{id}",
    enabled: true,
    component: EditStep,
  },

  //------------------Genre Management------------------
  {
    key: "gemre-list-route",
    title: "ジャンル一覧",
    path: "genre/index",
    enabled: true,
    component: GenreList,
  },
  {
    key: "genre-create-route",
    title: "ジャンルを作成する",
    path: "genre/create",
    enabled: true,
    component: CreateGenre,
  },
  {
    key: "genre-edit-route",
    title: "ジャンルを編集する",
    path: "genre/edit/{id}",
    enabled: true,
    component: EditGenre,
  },

  //------------------Genre Management------------------
  {
    key: "blog-list-route",
    title: "ブログリスト",
    path: "blog/index",
    enabled: true,
    component: BlogList,
  },
  {
    key: "blog-create-route",
    title: "ブログを作成する",
    path: "blog/create",
    enabled: true,
    component: CreateBlog,
  },
  {
    key: "blog-edit-route",
    title: "ブログを編集する",
    path: "blog/edit/{id}",
    enabled: true,
    component: EditBlog,
  },
  //------------------Base Info---------------------
  {
    key: "company-route",
    title: "Company",
    path: "baseinfo/company",
    enabled: true,
    component: Company,
  },
  {
    key: "department-route",
    title: "Department",
    path: "baseinfo/department",
    enabled: true,
    component: Department,
  },
  {
    key: "project-route",
    title: "Project",
    path: "baseinfo/project",
    enabled: true,
    component: Project,
  },
  {
    key: "employee-route",
    title: "Employee",
    path: "baseinfo/employee",
    enabled: true,
    component: Employee,
  },
  {
    key: "jobPosition-route",
    title: "JobPosition",
    path: "baseinfo/jobPosition",
    enabled: true,
    component: JobPosition,
  },
  //------------------Restaurant---------------------
  {
    key: "meal-route",
    title: "Meal",
    path: "restaurant/meal",
    enabled: true,
    component: Meal,
  },
  {
    key: "mealssettingmonthly-route",
    title: "MealsSettingMonthly",
    path: "restaurant/mealssettingmonthly",
    enabled: true,
    component: MealsSetting_Monthly,
  },
  {
    key: "mealsselection_currentmonth-route",
    title: "MealsSelection_CurrentMonth",
    path: "restaurant/mealsselectioncurrentmonth",
    enabled: true,
    component: MealsSelection_CurrentMonth,
  },
  {
    key: "mealsselection_nextmonth-route",
    title: "MealsSelection_NextMonth",
    path: "restaurant/mealsselectionnextmonth",
    enabled: true,
    component: MealsSelection_NextMonth,
  },
  //-------------Security Authentication-------------
  {
    key: "changepassword-route",
    title: "ChangePassword",
    path: "auth/changepassword",
    enabled: true,
    component: ChangePassword,
  },
  {
    key: "page404-route",
    title: "Page404",
    path: "*",
    enabled: true,
    component: Page404,
  },
  //-------------Security Authorization-------------
  {
    key: "group-route",
    title: "Group",
    path: "security/group",
    enabled: true,
    component: Group,
  },
  {
    key: "grouppermission-route",
    title: "GroupPermission",
    path: "security/grouppermission",
    enabled: true,
    component: GroupPermission,
  },
  {
    key: "permission-route",
    title: "Permission",
    path: "security/permission",
    enabled: true,
    component: Permission,
  },
  {
    key: "user-route",
    title: "User",
    path: "security/user",
    enabled: true,
    component: User,
  },
  {
    key: "usergroup-route",
    title: "UserGroup",
    path: "security/usergroup",
    enabled: true,
    component: UserGroup,
  },
];

export const authRoutes: Array<IRoute> = [
  //-------------Security Authentication-------------
  {
    key: "signin-route",
    title: "SignIn",
    path: "/",
    enabled: true,
    component: SignIn,
  },
  // {
  //     key: 'signup-route',
  //     title: 'SignUp',
  //     path: 'auth/signup',
  //     enabled: true,
  //     component: SignUp
  // },
  {
    key: "forgetpassword-route",
    title: "ForgetPassword",
    path: "auth/forgetpassword",
    enabled: true,
    component: ForgetPassword,
  },
  {
    key: "page404-route",
    title: "Page404",
    path: "*",
    enabled: true,
    component: Page404,
  },
];
