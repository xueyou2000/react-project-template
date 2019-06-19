import { RouteConfig } from "react-router-config";
import AuthorizedRoute from "@/Components/AuthorizedRoute";
import LoadComponent from "@/Components/LoadComponent";
import SystemLayout from "@/Layouts/SystemLayout";
import UserLayout from "@/Layouts/UserLayout";

export const RedirectPath = "/user/login";

export const ForgetPasswordtPath = "/user/forget-password";

export const ForgetPasswordtResultPath = `${ForgetPasswordtPath}-result`;

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
        path: ForgetPasswordtPath,
        title: "找回密码",
        exact: true,
        component: LoadComponent(() => import(/* webpackChunkName: "user" */ "@/Pages/User/ResetPassword"))
    },
    {
        path: ForgetPasswordtResultPath,
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
        component: SystemLayout,
        exact: true,
        route: AuthorizedRoute
    },
    {
        path: "/user",
        title: "用户管理",
        component: UserLayout,
        routes: UserRoutesConfig
    },
    {
        path: "/",
        title: "运营后台",
        component: SystemLayout,
        route: AuthorizedRoute
    }
];
