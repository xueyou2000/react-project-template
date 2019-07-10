import React, { useContext } from "react";
import classNames from "classnames";
import "./index.scss";

export interface MenuGroupProps {
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
     * 组标签
     */
    label: string;
}

function MenuGroup(props: MenuGroupProps) {
    const { prefixCls = "dropdown-menu_group", className, style, label, children } = props;

    return (
        <ul className={classNames(prefixCls, className)} style={style}>
            <p className={`${prefixCls}--title`}>{label}</p>
            <ul>{children}</ul>
        </ul>
    );
}

export default React.memo(MenuGroup);
