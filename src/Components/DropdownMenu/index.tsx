import React, { useContext } from "react";
import classNames from "classnames";
import "./index.scss";
import DropdownMenuContextState from "./DropdownMenuContext";

export interface DropdownMenuProps {
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
     * 内容
     */
    children?: React.ReactNode;
    /**
     * 显示图标
     */
    showIcon?: boolean;
    /**
     * 菜单点击事件
     */
    onClick?: (name?: string) => void;
}

function DropdownMenu(props: DropdownMenuProps) {
    const { prefixCls = "dropdown-menu", className, style, children, onClick, showIcon = false } = props;
    const classString = classNames(prefixCls, className, {
        "show-icon": showIcon,
    });

    return (
        <ul className={classString} style={style}>
            <DropdownMenuContextState.Provider value={{ showIcon, onMenuClick: onClick }}>{children}</DropdownMenuContextState.Provider>
        </ul>
    );
}

export default React.memo(DropdownMenu);
