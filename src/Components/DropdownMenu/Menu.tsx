import React, { useContext } from "react";
import classNames from "classnames";
import "./index.scss";
import DropdownMenuContextState from "./DropdownMenuContext";
import AntIcon from "@/Components/AntIcon";

export interface MenuProps {
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
     * 点击事件
     */
    onClick?: (name?: string) => void;
    /**
     * name
     */
    name?: string;
    /**
     * 菜单内容
     */
    children?: React.ReactNode;
    /**
     * 图标
     */
    icon?: string;
    /**
     * 是否显示分割线
     */
    divided?: boolean;
    /**
     * 是否禁用
     */
    disabled?: boolean;
}

function Menu(props: MenuProps) {
    const { prefixCls = "dropdown-menu_item", className, style, name, onClick, disabled, icon, children, divided } = props;
    const context = useContext(DropdownMenuContextState);
    const classString = classNames(prefixCls, className, {
        divided,
        disabled,
    });

    function clickHandle() {
        if (!disabled) {
            if (context && context.onMenuClick) {
                context.onMenuClick(name);
            }
            if (onClick) {
                onClick(name);
            }
        }
    }

    return (
        <li className={classString} style={style} tabIndex={0} onClick={clickHandle}>
            {icon && (
                <span className={`${prefixCls}--icon`}>
                    <AntIcon icon={icon} />
                </span>
            )}
            {children}
        </li>
    );
}

export default React.memo(Menu);
