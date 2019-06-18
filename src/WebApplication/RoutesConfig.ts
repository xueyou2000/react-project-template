import { RouteConfig } from "react-router-config";
import AuthorizedRoute from "@/Components/AuthorizedRoute";
import LoadComponent from "@/Components/LoadComponent";

export const RedirectPath = "/user/login";

export const ForgetPasswordtPath = "/user/forget-password";

/**
 * 用户管理路由
 */
export const UserRoutesConfig: RouteConfig[] = [
    {
        path: RedirectPath,
        title: "用户登录",
        exact: true,
        component: LoadComponent(() => import(/* webpackChunkName: "user" */ "@/Pages/User/Login"))
    },
    {
        path: "/user/register",
        title: "用户注册",
        exact: true,
        component: LoadComponent(() => import(/* webpackChunkName: "user" */ "@/Pages/test"))
    },
    {
        path: "/user/register-result",
        title: "用户注册完成",
        exact: true,
        component: LoadComponent(() => import(/* webpackChunkName: "user" */ "@/Pages/test"))
    },
    {
        path: ForgetPasswordtPath,
        title: "找回密码",
        exact: true,
        component: LoadComponent(() => import(/* webpackChunkName: "user" */ "@/Pages/test"))
    },
    {
        path: `${ForgetPasswordtPath}-result`,
        title: "找回密码完成",
        exact: true,
        component: LoadComponent(() => import(/* webpackChunkName: "user" */ "@/Pages/test"))
    }
];

/**
 * 根节点路由
 */
export const RootRoutesConfig: RouteConfig[] = [
    {
        path: "/",
        title: "运营后台",
        component: LoadComponent(() => import(/* webpackChunkName: "system" */ "@/Layouts/SystemLayout")),
        exact: true,
        route: AuthorizedRoute
    },
    {
        path: "/user",
        title: "用户管理",
        component: LoadComponent(() => import(/* webpackChunkName: "user" */ "@/Layouts/UserLayout")),
        routes: UserRoutesConfig
    },
    {
        path: "/",
        title: "运营后台",
        component: LoadComponent(() => import(/* webpackChunkName: "system" */ "@/Layouts/SystemLayout")),
        route: AuthorizedRoute
    }
];
