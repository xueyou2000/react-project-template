import React from "react";
import classNames from "classnames";
import "./index.scss";
import AntIcon from "../AntIcon";

export interface ResultProps {
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
     * 扩展内容
     */
    children?: React.ReactNode;
    /**
     * 状态
     */
    status?: "info" | "error" | "success" | "warning";
    /**
     * 标题
     */
    title?: React.ReactNode;
    /**
     * 说明描述
     */
    description?: React.ReactNode;
    /**
     * 底部操作按钮
     */
    actions?: React.ReactNode;
}

function Result(props: ResultProps) {
    const { prefixCls = "xy-result", className, style, children, status = "info", title, description, actions } = props;

    function getIcon() {
        switch (status) {
            case "warning":
                return "exclamation-circle";
            case "success":
                return "check-circle";
            case "error":
                return "cross-circle";
            default:
                return "info-circle";
        }
    }

    return (
        <div className={classNames(prefixCls, className, `${prefixCls}--status-${status}`)} style={style}>
            <div className={`${prefixCls}_icon`}>
                <AntIcon icon={getIcon()} />
            </div>
            <div className={`${prefixCls}_title-outer`}>
                <div className={`${prefixCls}_title-inner`}>{title}</div>
            </div>
            <div className={`${prefixCls}_description`}>{description}</div>
            {children}
            <div className={`${prefixCls}_actions`}>{actions}</div>
        </div>
    );
}

export default React.memo(Result);
