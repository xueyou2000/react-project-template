import Store from "./Store";
import { OperatorInfo } from "@/Interface/OperatorInterface";
import { MenuFolder, PageInfo } from "@/Interface/ProjectInterface";

interface GlobalStoreSchemeDefin {
    /**
     * 登录操作员信息
     */
    operator: Store<OperatorInfo>;
    /**
     * 登录菜单
     */
    menus: Store<MenuFolder[]>;
    /**
     * 页面url
     */
    pathname: Store<string>;
    /**
     * 已打开页面
     */
    pages: Store<PageInfo[]>;
    /**
     * 页面索引
     */
    pageIndex: Store<number>;
}

/**
 * 全局Store定义
 */
const GlobalStoreScheme: GlobalStoreSchemeDefin = {
    operator: Store.Create(),
    menus: Store.Create([]),
    pathname: Store.Create("/welcome"),
    pages: Store.Create([]),
    pageIndex: Store.Create(0),
};

export default GlobalStoreScheme;
