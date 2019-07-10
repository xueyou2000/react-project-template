import classNames from "classnames";
import React from "react";
import "./index.scss";

export interface MenuItemProps {
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
     * 菜单点击事件
     */
    onClick?: (url: string, name: string) => void;
    /**
     * 菜单是否激活
     */
    active?: boolean;
    /**
     * 菜单名称
     */
    children?: string;
    /**
     * 菜单url
     */
    url?: string;
}

function MenuItem(props: MenuItemProps) {
    const { prefixCls = "menu-item", className, style, onClick, active = false, children, url } = props;
    const classString = classNames(prefixCls, className, {
        selected: active,
    });

    function handleClick() {
        if (onClick) {
            onClick(url, children);
        }
    }

    return (
        <li className={classString} style={style} onClick={handleClick}>
            <a data-url={url}>{children}</a>
        </li>
    );
}

export default React.memo(MenuItem);
