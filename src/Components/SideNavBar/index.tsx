import classNames from "classnames";
import React, { useEffect, useState } from "react";
import "./index.scss";
import { MenuFolder } from "@/Interface/ProjectInterface";
import MenuFolderConponent from "./MenuFolder";
import MenuItemConponent from "./MenuItem";
import withContext from "@/Components/WithContext";
import PageManage from "@/Stores/PageManage";

export interface SideNavBarProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 菜单点击改变
     */
    onChange?: (url: string) => void;
    /**
     * 当前路径
     */
    url?: string;
    /**
     * 菜单配置
     */
    menus?: MenuFolder[];
    /**
     * 页面管理器
     */
    pageManage?: PageManage;
}

function SideNavBar(props: SideNavBarProps) {
    const { prefixCls = "sider-menu-list", className, style, onChange, url, menus = [], pageManage } = props;
    const [openFoldUrl, setOpenFoldUrl] = useState(url);

    useEffect(() => {
        // url改变, 则改变当前打开菜单目录
        setOpenFoldUrl(openFoldUrl);
    }, [url]);

    function handleMenuFold(fold: boolean, url: string) {
        setOpenFoldUrl(fold ? url : null);
    }

    function handleMenuSelect(url: string, name: string) {
        pageManage.createOrSwitch(name, url);
    }

    function renderItem(menu: MenuFolder) {
        return (
            <MenuItemConponent key={menu.path} url={menu.path} active={url === menu.path} onClick={handleMenuSelect}>
                {menu.name}
            </MenuItemConponent>
        );
    }

    function renderMenus() {
        return menus.map((menu) => {
            if ("children" in menu && menu.children.length > 0) {
                return (
                    <MenuFolderConponent key={menu.path} name={menu.name} url={menu.path} fold={openFoldUrl === menu.path} onFoldChange={handleMenuFold}>
                        {menu.children.map((x) => renderItem(x))}
                    </MenuFolderConponent>
                );
            } else {
                return renderItem(menu);
            }
        });
    }

    return (
        <ul className={classNames(prefixCls, className)} style={style}>
            {renderMenus()}
        </ul>
    );
}

export default React.memo(withContext(SideNavBar));
