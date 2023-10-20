// import { Dashboard } from "@mui/icons-material";
import async from "../components/Async";
// import BlogList from "../pages/blogs/BlogList";
// import CreateBlog from "../pages/blogs/CreateBlog";
// import EditBlog from "../pages/blogs/EditBlog";
// import CreateGenre from "../pages/genres/CreateGenre";
// import EditGenre from "../pages/genres/EditGenre";
// import GenreList from "../pages/genres/GenreList";
// import CreateStep from "../pages/steps/CreateStep";
// import EditStep from "../pages/steps/EditStep";
// import StepList from "../pages/steps/StepList";
// import CreateUser from "../pages/users/CreateUser";
// import EditUser from "../pages/users/EditUser";
// import UserList from "../pages/users/EditUser";
import { IRoute } from "../types/RouteType";


const CreateUser = async(() => import("../pages/users/CreateUser"));
const EditUser = async(() => import("../pages/users/EditUser"));
const UserList = async(() => import("../pages/users/EditUser"));

const CreateStep = async(() => import("../pages/steps/CreateStep"));
const EditStep = async(() => import("../pages/steps/EditStep"));
const StepList = async(() => import("../pages/steps/StepList"));

const CreateGenre = async(() => import("../pages/genres/CreateGenre"));
const EditGenre = async(() => import("../pages/genres/EditGenre"));
const GenreList = async(() => import("../pages/genres/GenreList"));

const CreateBlog = async(() => import("../pages/blogs/CreateBlog"));
const EditBlog = async(() => import("../pages/blogs/EditBlog"));
const BlogList = async(() => import("../pages/blogs/BlogList"));


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

export const default_routes: Array<IRoute> = [
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
];

export const routes: Array<IRoute> = [


  //------------------User Management------------------
  {
    key: "user-list-route",
    title: "ユーザーリスト",
    path: "user/index",
    enabled: true,
    permission: 2,
    component: UserList,
  },
  {
    key: "user-create-route",
    title: "ユーザーを追加する",
    path: "user/create",
    enabled: true,
    permission: 2,
    component: CreateUser,
  },
  {
    key: "user-edit-route",
    title: "ユーザーの編集",
    path: "user/edit/:id",
    enabled: true,
    permission: 2,
    component: EditUser,
  },

  //------------------Step Management------------------
  {
    key: "step-list-route",
    title: "ステップリスト",
    path: "step/index",
    enabled: true,
    permission: 2,
    component: StepList,
  },
  {
    key: "step-create-route",
    title: "ステップの作成",
    path: "step/create",
    enabled: true,
    permission: 2,
    component: CreateStep,
  },
  {
    key: "step-edit-route",
    title: "ステップを編集する",
    path: "step/edit/{id}",
    enabled: true,
    permission: 2,
    component: EditStep,
  },

  //------------------Genre Management------------------
  {
    key: "gemre-list-route",
    title: "ジャンル一覧",
    path: "genre/index",
    enabled: true,
    permission: 2,
    component: GenreList,
  },
  {
    key: "genre-create-route",
    title: "ジャンルを作成する",
    path: "genre/create",
    enabled: true,
    permission: 2,
    component: CreateGenre,
  },
  {
    key: "genre-edit-route",
    title: "ジャンルを編集する",
    path: "genre/edit/{id}",
    enabled: true,
    permission: 2,
    component: EditGenre,
  },

  //------------------Genre Management------------------
  {
    key: "blog-list-route",
    title: "ブログリスト",
    path: "blog/index",
    enabled: true,
    permission: 2,
    component: BlogList,
  },
  {
    key: "blog-create-route",
    title: "ブログを作成する",
    path: "blog/create",
    enabled: true,
    permission: 2,
    component: CreateBlog,
  },
  {
    key: "blog-edit-route",
    title: "ブログを編集する",
    path: "blog/edit/{id}",
    enabled: true,
    permission: 2,
    component: EditBlog,
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
