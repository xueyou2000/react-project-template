import React from "react";
import classNames from "classnames";
import "./icons.scss";

export interface AntIconProps {
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
     * 图标类型
     */
    icon?: string;
    /**
     * 是否旋转
     */
    spin?: boolean;
    /**
     * 点击事件
     */
    onClick?: React.MouseEventHandler<HTMLElement>;
}

function AntIcon(props: AntIconProps) {
    const { prefixCls = "ant_icon", className, style, icon, spin, onClick } = props;
    const classString = classNames(prefixCls, className, `${prefixCls}-${icon}`, {
        [`${prefixCls}-spin`]: spin
    });

    return <i className={classString} style={style} onClick={onClick} />;
}

export default React.memo(AntIcon);
