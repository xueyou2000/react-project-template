import React from "react";
import classNames from "classnames";
import "./index.scss";

export interface LoadingProps {
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
     * 加载点尺寸
     */
    size?: number;
}

function Loading(props: LoadingProps) {
    const { prefixCls = "xy-grid-pulse", className, style, size = 15 } = props;
    const width = 3 * size + 12;

    const bollSty: React.CSSProperties = {
        width: size,
        height: size
    };

    return (
        <div className={classNames(prefixCls, "fix", className)} style={Object.assign({}, style, { width })}>
            <div style={bollSty} />
            <div style={bollSty} />
            <div style={bollSty} />
            <div style={bollSty} />
            <div style={bollSty} />
            <div style={bollSty} />
            <div style={bollSty} />
            <div style={bollSty} />
            <div style={bollSty} />
        </div>
    );
}

export default React.memo(Loading);
