import { RouteConfig } from 'react-router-config';
import LoadComponent from "@/Components/LoadComponent";

/**
 * 项目路由
 */
export const ProjectRoutesConfig: RouteConfig[] = [
    {
        title: '首页',
        path: "/welcome",
        component: LoadComponent(() => import(/* webpackChunkName: "Test" */ "@/Pages/Test")),
    },
    {
        title: '系统管理',
        path: "/system",
        routes: [
            {
                title: "菜单管理",
                path: "/system/menu",
                component: LoadComponent(() => import(/* webpackChunkName: "Test" */ "@/Pages/System/Menu")),
            },
            {
                title: "公众号配置",
                path: "/system/wechat",
                component: LoadComponent(() => import(/* webpackChunkName: "Test" */ "@/Pages/Test")),
            },
        ],
    },
    {
        title: '账户管理',
        path: "/account",
        routes: [
            {
                title: "账户查询",
                path: "/account/query",
                component: LoadComponent(() => import(/* webpackChunkName: "Test" */ "@/Pages/Test")),
            },
        ],
    },
    {
        title: '商户管理',
        path: "/customer",
        routes: [
            {
                title: "商户查询",
                path: "/customer/query",
                component: LoadComponent(() => import(/* webpackChunkName: "Test" */ "@/Pages/Test")),
            },
            {
                title: "商户开通",
                path: "/customer/create",
                component: LoadComponent(() => import(/* webpackChunkName: "Test" */ "@/Pages/Test")),
            },
        ],
    },
    {
        title: '订单管理',
        path: "/order",
        routes: [
            {
                title: "代付订单",
                path: "/order/dpay-order",
                component: LoadComponent(() => import(/* webpackChunkName: "Test" */ "@/Pages/Test")),
            },
            {
                title: "交易订单",
                path: "/order/trans-order",
                component: LoadComponent(() => import(/* webpackChunkName: "Test" */ "@/Pages/Test")),
            },
        ],
    },

];

export default ProjectRoutesConfig;