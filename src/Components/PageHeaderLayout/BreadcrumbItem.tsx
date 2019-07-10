import React from "react";


export interface BreadcrumbItemProps {
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 面包屑名称
     */
    name?: string;
    /**
     * 面包屑url
     */
    url?: string;
    /**
     * 是否可点击
     */
    isLinkable?: boolean;
    /**
     * 是否显示分隔符
     */
    separator?: boolean;
    /**
     * 点击
     */
    onClick?: (url: string) => void;
}

function BreadcrumbItem(props: BreadcrumbItemProps) {
    const { className, style, name, url, isLinkable, separator, onClick } = props;
    const _isLinkable = isLinkable && separator;

    function clickHandle() {
        if (onClick && _isLinkable) {
            onClick(url);
        }
    }

    return (
        <span className={className} style={style}>
            <span className="breadcrumb-link">
                {
                    _isLinkable ? <a onClick={clickHandle}>{name}</a> : name
                }
            </span>
            {separator && <span className="breadcrumb-separator">/</span>}
        </span>
    );
}

export default React.memo(BreadcrumbItem);