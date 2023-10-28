import async from "../components/Async";
import { IRoute } from "../types/RouteType";

const CreateUser = async(() => import("../pages/users/CreateUser"));
const EditUser = async(() => import("../pages/users/EditUser"));
const UserList = async(() => import("../pages/users/UserList"));

const CreateStep = async(() => import("../pages/steps/CreateStep"));
const EditStep = async(() => import("../pages/steps/EditStep"));
const StepList = async(() => import("../pages/steps/StepList"));

const CreateGenre = async(() => import("../pages/genres/CreateGenre"));
const CreateGenreByLeader = async(() => import("../pages/genres/CreateGenreByLeader"));

const EditGenre = async(() => import("../pages/genres/EditGenre"));
const GenreList = async(() => import("../pages/genres/GenreList"));

const CreateBlog = async(() => import("../pages/blogs/CreateBlog"));
// const CreateBlog = async(() => import("../pages/blogs/CreateBlog"));

const EditBlog = async(() => import("../pages/blogs/EditBlog"));
const BlogList1 = async(() => import("../pages/blogs/BlogList1"));
const ShowBlog = async(() => import("../pages/blogs/ShowBlog"));

const Dashboard = async(() => import("../pages/dashboard/Dashboard"));
const About = async(() => import("../pages/About"));
const Config = async(() => import("../pages/config"));
const SignIn = async(() => import("../pages/security/authentication/signIn"));
const ChangePassword = async(
  () => import("../pages/security/authentication/changePassword")
);
const ForgetPassword = async(
  () => import("../pages/security/authentication/forgetPassword")
);
const Page404 = async(() => import("../pages/security/authentication/Page404"));

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


    //------------------User Management------------------
    {
      key: "leader-list-route",
      title: "ユーザーリスト",
      path: "leader/index",
      enabled: true,
      permission: 1,
      component: UserList,
    },
    {
      key: "leader-create-route",
      title: "ユーザーを追加する",
      path: "leader/create",
      enabled: true,
      permission: 1,
      component: CreateUser,
    },
    {
      key: "leader-edit-route",
      title: "ユーザーの編集",
      path: "leader/edit/:id",
      enabled: true,
      permission: 1,
      component: EditUser,
    },
  

  //------------------Step Management------------------
  {
    key: "step-list-route",
    title: "ステップリスト",
    path: "step/steps/:group_id",
    enabled: true,
    permission: 3,
    component: StepList,
  },
  {
    key: "step-create-route",
    title: "ステップを作成する",
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
    path: "genre/genres/:category_id",
    enabled: true,
    permission: 3,
    component: GenreList,
  },
  {
    key: "genre-create-route",
    title: "ジャンルを作成する",
    path: "genre/admin/create",
    enabled: true,
    permission: 1,
    component: CreateGenre,
  },  

  {
    key: "genre-create-route",
    title: "ジャンルを作成する",
    path: "genre/leader/create",
    enabled: true,
    permission: 2,
    component: CreateGenreByLeader,
  },  

  {
    key: "genre-edit-route",
    title: "ジャンルを編集する",
    path: "genre/edit/{id}",
    enabled: true,
    permission: 2,
    component: EditGenre,
  },

  //------------------blog Management------------------
  {
    key: "blog-list-route",
    title: "ブログリスト",
    path: "blog/blogs/:genre_id",
    enabled: true,
    permission: 3,
    component: BlogList1,
  },
  {
    key: "blog-create-route",
    title: "ブログを作成する",
    path: "blog/create/:genre_id",
    enabled: true,
    permission: 2,
    component: CreateBlog,
  },
  {
    key: "blog-edit-route",
    title: "ブログを編集する",
    path: "blog/edit/:id",
    enabled: true,
    permission: 2,
    component: EditBlog,
  },

  {
    key: "leader-edit-route",
    title: "ユーザーの編集",
    path: "blog/show/:id",
    enabled: true,
    permission: 3,
    component: ShowBlog,
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
