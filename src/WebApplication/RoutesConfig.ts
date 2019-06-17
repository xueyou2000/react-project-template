import { RouteConfig } from "react-router-config";
import AuthorizedRoute from "@/Components/AuthorizedRoute";
import LoadComponent from "@/Components/LoadComponent";

export const RedirectPath = "/user/login";

/**
 * 用户管理路由
 */
export const UserRoutesConfig: RouteConfig[] = [
    {
        path: RedirectPath,
        title: "用户登录",
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
        component: LoadComponent(() => import(/* webpackChunkName: "system" */ "@/Pages/test")),
        exact: true,
        route: AuthorizedRoute
    },
    {
        path: "/user",
        title: "用户管理",
        component: LoadComponent(() => import(/* webpackChunkName: "user" */ "@/Pages/test")),
        routes: UserRoutesConfig
    },
    {
        path: "/",
        title: "运营后台",
        component: LoadComponent(() => import(/* webpackChunkName: "system" */ "@/Pages/test")),
        route: AuthorizedRoute
    }
];
